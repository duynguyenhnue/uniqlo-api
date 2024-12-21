import { Types } from "mongoose";
import { UserResponse } from "./users.request";
import { ProductResponse } from "./product.respone";

export class OrderItemRespone {
    id: string;
    productId:string;
    Product_name:string;
    Product_sku: string;
    Product_brand: string;
    Product_tag: string;
    Product_description: string;
    Product_currency: string;
    Product_color: string[];
    Product_size: string[];
    Product_images:string[];
    Product_specifications: string | null;
    Product_price: number;
    Product_count: number;
    Product_isNewArrival: boolean;
    Product_isBestSeller: boolean;
    Product_isOnSale: boolean;
    categoryId: string;
    count: number;
    color:string;
    size:string;
    totalPrice: number;
  }

export class OrderRespone{
   id:string;
      userId: string;
      user?:{
        email: string;
  fullName: string;
  phone: {
    country: string;
    number: string;
  };
  dateOfBirth: Date;
  address: {
    province: string;
    district: string;
    ward: string;
  };
  role: string;
  gender: string;
  avatar: string | null;
      };
    orderItems: OrderItemRespone[];
    discountId?: string;
    discountAmount?: number;
    totalAmount: number;
    finalAmount: number;
    status: string;
   createdAt:Date;
    updatedAt:Date;
}