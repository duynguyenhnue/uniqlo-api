import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { fitlerProduct, ProductCreateRequest, ProductSearchRequest, ProductUpdateRequest } from "src/payload/request/product.request";
import { FavoriteResponseDto } from "src/payload/response/favourites.respone";
import { ProductResponse } from "src/payload/response/product.respone";
import { FavoriteProduct } from "src/schema/favourites.schema";
import { Product } from "src/schema/product.schema";
import { User } from "src/schema/user.schema";

@Injectable()
export class FavoutiesService{
    constructor(@InjectModel(FavoriteProduct.name) private readonly favoriteProductModel:Model<FavoriteProduct>,
    @InjectModel(Product.name) private readonly productModel:Model<Product>,
    @InjectModel(User.name) private readonly userModel:Model<User>) { }

// xử lý phần tym trang chủ

  async ProductFavorite(user_Id:string,product_Id:string):Promise<FavoriteResponseDto>{
    try{
      const user=await this.userModel.findById(user_Id);
      if(!user)
      {
        throw new NotFoundException(`User not found`);
      }
      const productObjectId =new Types.ObjectId(product_Id);
      const productIndex=user.product_Id.indexOf(productObjectId);
      let product;
      if(productIndex!==-1)
      {
        user.product_Id.splice(productIndex,1);
        product=await this.productModel.findById(product_Id);

      }
      else{
        user.product_Id.push(productObjectId);
      }
      await user.save({ validateBeforeSave: false });

      product=await this.productModel.findById(product_Id);
      return{
        message:productIndex===-1?'Added to favourites':'Remove from favourites',
        product:this.mapproductToResponse(product)
      };
    }catch(error)
    {
      throw new Error(error.message);
    }
  }
async getlistfavouriteProduct(user_Id:string,query:any):Promise<{products:ProductResponse[];total:number}>
{
  try{
    const page = parseInt(query.page) || 0;
    const limit = parseInt(query.limit) || 6;
    const user=await this.userModel.findById(user_Id);
  if(!user)
  {
    throw new NotFoundException('User not found');

  }
  const productObjectIds = user.product_Id.map((id) => new Types.ObjectId(id));
  const offset=(page)*limit;
  const total = await this.productModel.countDocuments({
    _id: { $in: productObjectIds },
  });
  const products= await this.productModel
      .find({ _id: { $in: productObjectIds } })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec()  ;

  return {
    products: products.map(this.mapproductToResponse),
    total,
  };
  }catch(error)
  {
    throw new Error(error.message);
  }
}

private mapproductToResponse(product: Product): ProductResponse {
    return {
        id: product._id.toString(),
        Product_name: product.Product_name,
        Product_brand:product.Product_brand,
        Product_tag:product.Product_tag,
        Product_sku: product.Product_sku,
        Product_description: product.Product_description,
        Product_currency: product.Product_currency,
        Product_color: product.Product_color,
        Product_size: product.Product_size,
        Product_variantSku: product.Product_variantSku,
        Product_specifications: product.Product_specifications,
        Product_price: product.Product_price,
        Product_rating: product.Product_rating,
        Product_count: product.Product_count,
        Product_images: product.Product_images,
        Product_isNewArrival: product.Product_isNewArrival,
        Product_isBestSeller: product.Product_isBestSeller,
        Product_isOnSale: product.Product_isOnSale,
        categoryId: product.categoryId,
        userId: product.userId,
        reviews: product.reviews.map((review) => review.toString()),
        favorite_users: product.favorite_users,
    };
}
}