import { Types } from "mongoose";

export class CommentResponse {
    id: string;
    name: string;
    email: string;
    phone: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
  }

export class BlogDetailRespone{
   id:string;
   title:string;
   image:string;
   content:string;
   author:string;
   commentcount:number;
   createdAt:Date;
    updatedAt:Date;
   comments:CommentResponse[];
}