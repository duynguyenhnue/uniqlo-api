import { Types } from "mongoose";

export class PromotionResponse {
    id: string;
    name: string;
    code: string;
    type: string;
    value: number;
    minOrderValue: number;
    maxDiscount: number;
    startDate: Date;
    endDate: Date;
    usageLimit: number;
    usageCount: number;
    productId:string;
    device: string;
    status: string;
}
