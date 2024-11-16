import { Type } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})
export class Notification extends Document{
    @Prop({type:Types.ObjectId,ref:'user',required:true})
    userId:Types.ObjectId;
    @Prop({required:true})
    title:string;
    @Prop({required:true})
    content:string;
    @Prop({required:true})
    type:string;
    @Prop({required:true,default:false})
    isRead:boolean
    @Prop({required:true})
    platfrom:string;
}
export const NotificationSchema = SchemaFactory.createForClass(Notification);
