import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductCreateRequest, ProductSearchRequest, ProductUpdateRequest } from "src/payload/request/product.request";
import { ProductResponse } from "src/payload/response/product.respone";
import { Product } from "src/schema/product.schema";

@Injectable()
export class ProductService{
    constructor(@InjectModel(Product.name) private readonly productModel:Model<Product>)
    { }
    async create(create:ProductCreateRequest):Promise<ProductResponse>{
        try{
            const product=await this.createproductindb(create);
            return this.mapproductToResponse(product);
        }catch(error){
            throw error;
        }
}
private async createproductindb(create:ProductCreateRequest):Promise<Product>{
    console.log("kq>>",create);
    return this.productModel.create(create);

}
async searchproduct(query:ProductSearchRequest):Promise<{data:ProductResponse[];total:number}>
{
    const {limit=6,page=0,Product_name,Product_price}=query;
    const offset=(page-1)*limit;
    const filter: any = {};
if(Product_name)
{
    const value=String(Product_name).trim();
    filter.Product_name={ $regex: value, $options: "i"};
}
if(Product_price)
    {
        const value=String(Product_price).trim();
        filter.Product_price={ $regex: value, $options: "i"};
    }
console.log("filter",filter)
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
}

async findAll(): Promise<ProductResponse[]> {
    const product = await this.productModel.find().exec();
    return product.map(products => this.mapproductToResponse(products));
  }

  async findOne(id:string):Promise<ProductResponse>{
    const check=await this.productModel.findById(id).exec();
    if(!check)
    {
        throw new NotFoundException(`Category with Id ${id} not found`);
    }
    return this.mapproductToResponse(check);
}

async update(id:string,updateproduct:ProductUpdateRequest):Promise<ProductResponse>{
    console.log("ID:", id);
    const update=await this.productModel.findByIdAndUpdate(id,updateproduct,{new:true,}).exec();
    if (!update) {
        throw new NotFoundException(`Category with ID not found`);   
    }
    return this.mapproductToResponse(update);
}

async delete(id:string):Promise<void>{
    const kq=await this.productModel.findByIdAndDelete(id).exec();
if(!kq)
{
    throw new NotFoundException(`Category with ID not found`);
}
}

private mapproductToResponse(product: Product): ProductResponse {
    return {
        id: product._id.toString(),
        Product_name: product.Product_name,
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