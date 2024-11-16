import { Type } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})
export class Review extends Document{
    @Prop({required:true,type:Types.ObjectId,ref:'Product'})
    productId:Types.ObjectId;
    @Prop({type:Types.ObjectId,ref:'user',required:true})
    userId:Types.ObjectId;
    @Prop({required:true})
    rating:number;
    @Prop({required:true})
    title:string;
    @Prop({required:true})
    content:string;
    @Prop({required:true,type:[String],default:[]})
    image:string[]
    @Prop({required:true})
    like:number
    @Prop({required:true})
    status:string;
    @Prop({default:[],type:[String]})
    size:string[];
    @Prop({required:true})
    color:string;
}
export const ReviewSchema = SchemaFactory.createForClass(Review);
