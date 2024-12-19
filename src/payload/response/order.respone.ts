import { Types } from "mongoose";

export class OrderItemRespone {
    id: string;
    productId:string;
    count: number;
    totalPrice: number;
  }

export class OrderRespone{
   id:string;
      userId: string;
    orderItems: OrderItemRespone[];
    discountId?: string;
    discountAmount?: number;
    totalAmount: number;
    finalAmount: number;
    status: string;
   createdAt:Date;
    updatedAt:Date;
}