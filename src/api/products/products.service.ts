import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { fitlerProduct, ProductCreateRequest, ProductSearchRequest, ProductUpdateRequest } from "src/payload/request/product.request";
import { ProductResponse } from "src/payload/response/product.respone";
import { Product } from "src/schema/product.schema";
import { User } from "src/schema/user.schema";

@Injectable()
export class ProductService{
    constructor(@InjectModel(Product.name) private readonly productModel:Model<Product>,
    @InjectModel(User.name) private readonly userModel:Model<User>) { }

    async create(create:ProductCreateRequest):Promise<ProductResponse>{
        try{
            const product=await this.createproductindb(create);
            return this.mapproductToResponse(product);
        }catch(error){
            throw error;
        }
}
private async createproductindb(create:ProductCreateRequest):Promise<Product>{
   try{
    return this.productModel.create(create);
   }
   catch(error)
   {
    throw new Error(`Error while create product in database`);
   }

}
async searchproduct(
    query: ProductSearchRequest
  ): Promise<{ data: ProductResponse[]; total: number }> {
    try{
        const {
            limit = 6,
            page = 0,
            Product_name,
            categoryId
          } = query;
          const offset = (page ) * limit;
          const filter: any = {};
          if (Product_name) {
            const value = String(Product_name).trim();
            filter.Product_name = { $regex: value, $options: "i" };
          }
          
          if (categoryId) {
            const value = String(categoryId).trim();
            filter.categoryId = { $regex: value, $options: "i" };
          }
          console.log("filter", filter);
          const data = await this.productModel
            .find(filter)
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .exec();
          const total = await this.productModel.countDocuments(filter).exec();
          return {
            data: data.map(this.mapproductToResponse),
            total,
          };
    }catch(error)
    {
        throw error;
    }
  }

  async filterProduct(query:fitlerProduct):Promise<{data:ProductResponse[];total:number}>
  {
    try{
      const{limit=6,page=0,Product_brand,Product_color,Product_tag,Product_size,Product_price,maxPrice,minPrice}=query;
      const offset = (page) * limit;
      const filter:any={};
    // Lọc theo giá
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.Product_price = {};

      if (minPrice !== undefined) {
        filter.Product_price.$gte = Number(minPrice);
      }

      if (maxPrice !== undefined) {
        filter.Product_price.$lte = Number(maxPrice);
      }
    }
      if(Product_brand)
      {
        const value = String(Product_brand).trim();
            filter.Product_brand = { $regex: value, $options: "i" };
      }

      if
      (Array.isArray(Product_color))
      {
       filter.Product_color={$in:Product_color.map(color=>new RegExp(color.trim(),'i')) };
      }
      else
      {
        const value = String(Product_color).trim();
            filter.Product_color = { $regex: value, $options: "i" };
      }

      if
      (Array.isArray(Product_size))
      {
        filter.Product_size={$in:Product_size.map(size=>new RegExp(size.trim(),'i'))}
      }else{
        const value = String(Product_size).trim();
            filter.Product_size = { $regex: value, $options: "i" };
      }


      if(Product_tag)
      {
        const value = String(Product_tag).trim();
            filter.Product_tag = { $regex: value, $options: "i" };
      }
      if (Product_price) {
        const { minPrice, maxPrice } = Product_price;
        
        if (minPrice !== undefined || maxPrice !== undefined) {
          filter.Product_price = {};
  
          if (minPrice !== undefined) {
            filter.Product_price.$gte = Number(minPrice);
          }
  
          if (maxPrice !== undefined) {
            filter.Product_price.$lte = Number(maxPrice);
          }
        }
      }
      const data = await this.productModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
      const total=await this.productModel.countDocuments(filter).exec();

            return{
              data:data.map(this.mapproductToResponse),
              total,
            };

    }catch(error)
    {
      throw error;
    }
  }

async findAll(): Promise<ProductResponse[]> {
    try{
        const product = await this.productModel.find().exec();
    return product.map(products => this.mapproductToResponse(products));
    }catch(error)
    {
        throw error;
    }
  }

  async findOne(id:string):Promise<ProductResponse>{
    try{
        const check=await this.productModel.findById(id).exec();
    if(!check)
    {
        throw new NotFoundException(`Category with Id ${id} not found`);
    }
    return this.mapproductToResponse(check);
    }catch(error)
    {
        throw error;
    }
}

async update(id:string,updateproduct:ProductUpdateRequest):Promise<ProductResponse>{
    try{
        const update=await this.productModel.findByIdAndUpdate(id,updateproduct,{new:true,}).exec();
    if (!update) {
        throw new NotFoundException(`Category with ID not found`);   
    }
    return this.mapproductToResponse(update);
    }
    catch(error)
    {
        throw new Error(`Error while update product`)
    }
}

async delete(id:string):Promise<void>{
  try{
    const kq=await this.productModel.findByIdAndDelete(id).exec();
    if(!kq)
    {
        throw new NotFoundException(`Category with ID not found`);
    }
  }catch(error)
  {
    throw new Error(`Error while delete product`)
  }
}

// xử lý phần tym trang chủ

async ProductFavorite(user_Id:string,product_Id:string):Promise<any>{
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
    }
    else{
      user.product_Id.push(productObjectId);
    }
    await user.save();

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
async getlistfavouriteProduct(user_Id:string):Promise<ProductResponse[]>
{
  try{
    const user=await this.userModel.findById(user_Id);
  if(!user)
  {
    throw new NotFoundException('User not found');

  }
  const productObjectIds = user.product_Id.map(id => new Types.ObjectId(id));
  const list=await this.productModel.find({id:{$in:productObjectIds}});
  return list.map(this.mapproductToResponse);
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
    };
}
}