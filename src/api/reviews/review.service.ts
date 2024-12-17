import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateReview, SearchReview, UpdateReview } from "src/payload/request/review.request";
import { ReviewResponse } from "src/payload/response/review.respone";
import { Product } from "src/schema/product.schema";
import { Review } from "src/schema/reviews.schema";
import { threadId } from "worker_threads";

@Injectable ()
export class ReviewService{
constructor(
    @InjectModel(Review.name)private readonly ReviewModule:Model<Review>,
    @InjectModel(Product.name)private readonly ProductModule:Model<Review>,

){}

async create(create:CreateReview,userId:string)
{
    try{
       const {productId, rating, title, content, size, color}=create;
       const product=await this.ProductModule.findById(productId);
       if(!product)
       {
        throw new NotFoundException(`Not found`);
       }
       const review=await this.ReviewModule.create({...create,userId});
       return this.mapReviewToResponse(review);
    }catch(error)
    {
        throw error;
    }

}
private async createreviewindb(create:CreateReview):Promise<Review>{
    console.log("kq>>",create);
    return this.ReviewModule.create(create);

}

async search(query:SearchReview):Promise<{data:ReviewResponse[],total:number,page:number}>
{
    const {limit=6,page=0,title}=query;
    const offset=(page)*limit;
    const filter: any = {};
    if(!title||title.trim()==="")
        {
            throw new NotFoundException(`Not found`);
        }
    if(title)
        {
            const value=String(title).trim();
            filter.title={ $regex: value, $options: "i"};
        }

const data = await this.ReviewModule
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate('userId','fullname email')
      .populate('productId','ProductName Productprice')
      .exec();
      const total=await this.ReviewModule.countDocuments(filter).exec();
      return{
        data:data.map(this.mapReviewToResponse),
      total,
      page
      
      };
}

async findAll(): Promise<ReviewResponse[]> {
    const product = await this.ReviewModule.find().exec();
    return product.map(products => this.mapReviewToResponse(products));
  }
  async findOne(id:string):Promise<ReviewResponse>{
    const check=await this.ReviewModule.findById(id).exec();
    if(!check)
    {
        throw new NotFoundException(`Category with Id ${id} not found`);
    }
    return this.mapReviewToResponse(check);
}
async update(id:string,updatereview:UpdateReview):Promise<ReviewResponse>{
   try{
    const review =await this.ReviewModule.findById(id)
    if(!review)
    {
        throw new NotFoundException(`not found`);
    }
    
    const updatereviews=await this.ReviewModule.findByIdAndUpdate(id,updatereview,{new:true}).exec();
    return this.mapReviewToResponse(updatereviews);
   }catch(error)
   {
    throw error;
   }
}
async delete(id:string):Promise<void>{
   try
   {
    const kq=await this.ReviewModule.findByIdAndDelete(id).exec();
    if(!kq)
    {
        throw new NotFoundException(`Category with ID not found`);
    }
     await this.ReviewModule.findByIdAndDelete(id).exec();
   }catch(error)
   {
    throw error;
   }
}
private mapReviewToResponse(review: Review): ReviewResponse {
    return {
        id:review._id.toString(),
        productId: review.productId,
        userId:review.userId,
        rating: review.rating,
        title: review.title,
        content: review.content,
        size: review.size,
        color: review.color,
      };
}
}