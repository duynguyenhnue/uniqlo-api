import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { app } from "firebase-admin";
import { Model } from "mongoose";
import { CreatePromotionRequest, SearchPromotionRequest, UpdatePromotionRequest } from "src/payload/request/promotion.request";
import { PromotionResponse } from "src/payload/response/promotion.respone";
import { Promotion } from "src/schema/promotion.schema";

@Injectable()
export class PromotionService{
    constructor(@InjectModel(Promotion.name)private readonly PromotionModel:Model<Promotion>){}


    async create(createPromotionRequest:CreatePromotionRequest):Promise<PromotionResponse>{
        try{
            const { startDate, endDate, ...data } = createPromotionRequest;
            const promotion=new this.PromotionModel({
                ...data,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            })
            await promotion.save();
            return this.mapPromotionToResponse(promotion);
        }catch(error){
            throw error;
        }     
    } 

    private async createPromotionindb(createPromotionRequest:CreatePromotionRequest):Promise<Promotion>{
        console.log("kq>>",createPromotionRequest);
        return this.PromotionModel.create(createPromotionRequest);
    
    }

    async search(query:SearchPromotionRequest):Promise<{data:PromotionResponse[];total:number}>
{
    const {limit=6,page=0,code,name}=query;
    const offset=(page)*limit;
    const filter: any = {};
if(name)
{
    const value=String(name).trim();
    filter.name={ $regex: value, $options: "i"};
}
if(code)
    {
        const value=String(code).trim();
        filter.code={ $regex: value, $options: "i"};
    }
console.log("filter",filter)
const data = await this.PromotionModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
      const total=await this.PromotionModel.countDocuments(filter).exec();
      return{
        data:data.map(this.mapPromotionToResponse),
      total,
      };
}
async findAll(): Promise<PromotionResponse[]> {
    const promotion = await this.PromotionModel.find().exec();
    return promotion.map(promotions => this.mapPromotionToResponse(promotions));
  }

  async findOne(id:string):Promise<PromotionResponse>{
    const check=await this.PromotionModel.findById(id).exec();
    if(!check)
    {
        throw new NotFoundException(`Category with Id ${id} not found`);
    }
    return this.mapPromotionToResponse(check);
}
async update(id:string,updatePromotionRequest:UpdatePromotionRequest):Promise<PromotionResponse>{
    console.log("ID:", id);
    const data = {...updatePromotionRequest};
    if (data.startDate) {
        data.startDate = new Date(data.startDate);
    }
    if (data.endDate) {
        data.endDate = new Date(data.endDate);
    }
    const update = await this.PromotionModel.findByIdAndUpdate(id, data, { new: true }).exec();

    if (!update) {
        throw new NotFoundException(`Category with ID not found`);   
    }
    return this.mapPromotionToResponse(update);
}
async delete(id:string):Promise<void>{
    const kq=await this.PromotionModel.findByIdAndDelete(id).exec();
if(!kq)
{
    throw new NotFoundException(`Category with ID not found`);
}
} 
private mapPromotionToResponse(promotion: Promotion): PromotionResponse {
    return {
        id: promotion._id.toString(),
        name: promotion.name,
        code: promotion.code,
        type: promotion.type,
        value: promotion.value,
        minOrderValue: promotion.minOrderValue,
        maxDiscount: promotion.maxDiscount,
        startDate: promotion.startDate,
        endDate: promotion.endDate,
        usageLimit: promotion.usageLimit,
        usageCount: promotion.usageCount,
        productId: promotion.productId.toString(),
        device: promotion.device,
        status: promotion.status,
    };
}
}