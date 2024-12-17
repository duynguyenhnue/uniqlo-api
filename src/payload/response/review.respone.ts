import { Types } from "mongoose";

export class ReviewResponse {
    id:string;
    productId: Types.ObjectId;  
    userId: Types.ObjectId;      
    rating: number;             
    title: string;              
    content: string;             
    size: string[];              
    color: string;                        
  }