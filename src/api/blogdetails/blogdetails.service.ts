import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BlogDetailRespone } from "src/payload/response/blogdetails.respone";
import { Blogdetails, Comments } from "src/schema/blog-details.schema";
import { CreateBlogdetailRequest, CreateCommemtRequest, SearchBlogdetailRequest, UpdateBlogdetailRequest, UpdateCommentRequest } from "src/payload/request/blog-details.request";
import { Types } from "mongoose";

@Injectable()
export class BlogDetailService{
    constructor(@InjectModel(Blogdetails.name) private readonly blogdetailModel:Model<Blogdetails>,
    @InjectModel(Comments.name) private readonly commentModule:Model<Comments>
  ){}

    async create(create:CreateBlogdetailRequest):Promise<BlogDetailRespone>{
        try{
            const blogdetail=await this.createblogdetailindb(create);
            return this.mapblogdetailToResponse(blogdetail);
        }catch(error){
            throw error.message;
        }
}

private async createblogdetailindb(create:CreateBlogdetailRequest):Promise<Blogdetails>{
   try{
    return this.blogdetailModel.create(create);
   }
   catch(error)
   {
    throw new Error(`Error while create blogdetail in database ${error.message}`);
   }

}

async addCommenttoBlog(blogId:string,create:CreateCommemtRequest):Promise<BlogDetailRespone>{
  try{
    const blog=await this.blogdetailModel.findById(blogId);
  if(!blog)
  {
    throw new NotFoundException(`Blog with ID ${blogId} not found`);
  }
  const cmt=await this.commentModule.create({
    ...create,blog:new Types.ObjectId(blogId)
  });
  console.log("cmtId>>",cmt);
  blog.commentcount += 1;
  blog.comment.push(cmt);
  await blog.save();
  return this.mapblogdetailToResponse(blog);
  }catch(error)
  {
    throw new Error(`Error while add comment ${error.message}`);
  }

}

async searchblogdetail(
    query: SearchBlogdetailRequest
  ): Promise<{ data: BlogDetailRespone[]; total: number }> {
    try{
        const {
            limit = 6,
            page = 0,
            title
          } = query;
          const offset = (page) * limit;
          const filter: any = {};
          if (title) {
            const value = String(title).trim();
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
        const blogdetail = await this.blogdetailModel.find().populate('comment').exec();
    return blogdetail.map(blogdetails => this.mapblogdetailToResponse(blogdetails));
    }catch(error)
    {
        throw error.message;
    }
  }

  async findOne(id:string):Promise<BlogDetailRespone>{
    try{
        const check=await this.blogdetailModel.findById(id).populate('comment').exec();
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

        const update=await this.blogdetailModel.findByIdAndUpdate(id,updateblogdetail,{new:true,}).populate('comment').exec();
    if (!update) {
        throw new NotFoundException(`Category with ID not found`);   
    }
    return this.mapblogdetailToResponse(update);
    }
    catch(error)
    {
        throw new Error(`Error while update blogdetail ${error.message}`)
    }
}

async updateComment(blogId:string,commentId:string,updateComment:UpdateCommentRequest):Promise<BlogDetailRespone>{
  try{
    const blog= await this.blogdetailModel.findById(blogId).populate('comment').exec();
    if(!blog)
    {
      throw new NotFoundException(`Blog with ID ${blogId} not found`);
    }
    const cmt=blog.comment.find(comment=>comment._id.toString()===commentId)
    if(!cmt)
    {
      throw new NotFoundException(`Comment with ID ${commentId} not found in this blog`);
    }
    cmt.name=updateComment.name||cmt.name;
    cmt.email=updateComment.name||cmt.email;
    cmt.phone=updateComment.name||cmt.phone;
    cmt.comment=updateComment.name||cmt.comment;
    await this.commentModule.findByIdAndUpdate(commentId, {
      name: cmt.name,
      email: cmt.email,
      phone: cmt.phone,
      comment: cmt.comment,
    });
    return this.mapblogdetailToResponse(blog);

  }catch(error)
  {
    throw new Error(`${error.message}`);
  }
}

async delete(id:string):Promise<void>{
  try{
    const dltblog=await this.blogdetailModel.findByIdAndDelete(id).exec();
    if(!dltblog)
    {
        throw new NotFoundException(`Category with ID not found`);
    }
    await this.commentModule.deleteMany({blog:id})
  }catch(error)
  {
    throw new Error(`Error while delete blogdetail ${error.message}`)
  }
}

async removeCommentFromBlog(blogId: string, commentId: string): Promise<BlogDetailRespone> {
  try {
    const blog = await this.blogdetailModel.findById(blogId).populate('comment').exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${blogId} not found`);
    }

    const commentIndex = blog.comment.findIndex((comment) => comment._id.toString() === commentId);
    if (commentIndex === -1) {
      throw new NotFoundException(`Comment with ID ${commentId} not found in this blog`);
    }

    blog.comment.splice(commentIndex, 1);
    blog.commentcount -= 1; 
    await blog.save();

    await this.commentModule.findByIdAndDelete(commentId);

    return this.mapblogdetailToResponse(blog);
  } catch (error) {
    throw new InternalServerErrorException(`Error while removing comment: ${error.message}`);
  }
}


private mapblogdetailToResponse(blogDetail: Blogdetails): BlogDetailRespone {
    return {
       id: blogDetail._id ?blogDetail._id.toString():"",
       title:blogDetail.title,
   image:blogDetail.image,
   content:blogDetail.content,
   author:blogDetail.author,
   commentcount:blogDetail.commentcount,
   createdAt: blogDetail.createdAt,  
        updatedAt: blogDetail.updatedAt,
   comments:blogDetail.comment ?blogDetail.comment.map((comment)=>({
          id:comment._id? comment._id.toString():"",
          name: comment.name,
            email: comment.email,
            phone: comment.phone,
            comment: comment.comment,
            createdAt: comment.createdAt, 
            updatedAt: comment.updatedAt,

   })):[]

        
    };
}
}