import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BlogDetailRespone } from "src/payload/response/blogdetails.respone";
import { Blogdetails } from "src/schema/blog-details.schema";
import { CreateBlogdetailRequest, SearchBlogdetailRequest, UpdateBlogdetailRequest } from "src/payload/request/blog-details.request";

@Injectable()
export class BlogDetailService{
    constructor(@InjectModel(Blogdetails.name) private readonly blogdetailModel:Model<Blogdetails>)
    { }
    async create(create:CreateBlogdetailRequest):Promise<BlogDetailRespone>{
        try{
            const blogdetail=await this.createblogdetailindb(create);
            return this.mapblogdetailToResponse(blogdetail);
        }catch(error){
            throw error;
        }
}
private async createblogdetailindb(create:CreateBlogdetailRequest):Promise<Blogdetails>{
   try{
    return this.blogdetailModel.create(create);
   }
   catch(error)
   {
    throw new Error(`Error while create blogdetail in database`);
   }

}
async searchblogdetail(
    query: SearchBlogdetailRequest
  ): Promise<{ data: BlogDetailRespone[]; total: number }> {
    try{
        const {
            limit = 6,
            page = 0,
            Comment
          } = query;
          const offset = (page) * limit;
          const filter: any = {};
          if (Comment) {
            const value = String(Comment).trim();
            filter.Comment = { $regex: value, $options: "i" };
          }
          const data = await this.blogdetailModel
            .find(filter)
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .exec();
          const total = await this.blogdetailModel.countDocuments(filter).exec();
          return {
            data: data.map(this.mapblogdetailToResponse),
            total,
          };
    }catch(error)
    {
        throw error;
    }
  }

async findAll(): Promise<BlogDetailRespone[]> {
    try{
        const blogdetail = await this.blogdetailModel.find().exec();
    return blogdetail.map(blogdetails => this.mapblogdetailToResponse(blogdetails));
    }catch(error)
    {
        throw error;
    }
  }

  async findOne(id:string):Promise<BlogDetailRespone>{
    try{
        const check=await this.blogdetailModel.findById(id).exec();
    if(!check)
    {
        throw new NotFoundException(`Category with Id ${id} not found`);
    }
    return this.mapblogdetailToResponse(check);
    }catch(error)
    {
        throw error;
    }
}

async update(id:string,updateblogdetail:UpdateBlogdetailRequest):Promise<BlogDetailRespone>{
    try{
        const update=await this.blogdetailModel.findByIdAndUpdate(id,updateblogdetail,{new:true,}).exec();
    if (!update) {
        throw new NotFoundException(`Category with ID not found`);   
    }
    return this.mapblogdetailToResponse(update);
    }
    catch(error)
    {
        throw new Error(`Error while update blogdetail`)
    }
}

async delete(id:string):Promise<void>{
  try{
    const kq=await this.blogdetailModel.findByIdAndDelete(id).exec();
    if(!kq)
    {
        throw new NotFoundException(`Category with ID not found`);
    }
  }catch(error)
  {
    throw new Error(`Error while delete blogdetail`)
  }
}

private mapblogdetailToResponse(blogDetail: Blogdetails): BlogDetailRespone {
    return {
        id: blogDetail._id.toString(),
        Name: blogDetail.Name,
        Email: blogDetail.Email,
        Phone: blogDetail.Phone,
        Comment: blogDetail.Comment,
        
    };
}
}