import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateReview, SearchReview, UpdateReview } from "src/payload/request/review.request";
import { ReviewResponse } from "src/payload/response/review.respone";
import { Review } from "src/schema/reviews.schema";
import { threadId } from "worker_threads";

@Injectable ()
export class ReviewService{
constructor(@InjectModel(Review.name)private readonly ReviewModule:Model<Review>){}

async create(create:CreateReview)
{
    try{
        const  review=await this.createreviewindb(create);
        return this.mapReviewToResponse(review)
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
    const {limit=6,page=1,title}=query;
    const offset=(page-1)*limit;
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

    console.log("filter",filter);
    console.log("limit:",limit);
    console.log("page:",page);
    console.log("title:",title);
const data = await this.ReviewModule
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
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
    console.log("ID:", id);
    const update=await this.ReviewModule.findByIdAndUpdate(id,updatereview,{new:true,}).exec();
    if (!update) {
        throw new NotFoundException(`Category with ID not found`);   
    }
    return this.mapReviewToResponse(update);
}
async delete(id:string):Promise<void>{
    const kq=await this.ReviewModule.findByIdAndDelete(id).exec();
if(!kq)
{
    throw new NotFoundException(`Category with ID not found`);
}
}
private mapReviewToResponse(review: Review): ReviewResponse {
    return {
        id:review._id.toString(),
        productId: review.productId,
        userId: review.userId,
        rating: review.rating,
        title: review.title,
        content: review.content,
        image: review.image,
        like: review.like,
        status: review.status,
        size: review.size,
        color: review.color,
      };
}
}