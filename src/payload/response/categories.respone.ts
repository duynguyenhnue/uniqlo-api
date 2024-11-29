import { Types } from "mongoose";

export class CategoryResponse {
    id: string; 
    name: string; 
    image: string; 
    order: number; 
    featured: boolean; 
    // size: string; 
    // color: string; 
    material: string; 
    status: string; 
    // product_id:Types.ObjectId
  }