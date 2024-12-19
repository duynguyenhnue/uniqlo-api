import { Types } from "mongoose";
import { ReplyReviewRequest } from "../request/review.request";

export class ReviewResponse {
    _id:string;
    productId: Types.ObjectId;  
    userId: Types.ObjectId;      
    rating: number;             
    title: string;              
    content: string;             
    size: string[];              
    color: string;   
    productName?: string;
    fullName?: string;
    avatar?: string;
    reply?: ReplyReviewRequest[];
  }