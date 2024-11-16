import { Prop, Schema } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { Types } from "mongoose";

@Schema({timestamps:{createdAt:'createdAt',updatedAt:'createdAt'}})
export class Order extends Document{

    @Prop ({required:true,unique:true})
    OrderNumber:string;

    @Prop({required:true,type:Types.ObjectId,ref:'users'})
    userId:Types.ObjectId;

    @Prop({required:true})
    Nameproduct:String



}