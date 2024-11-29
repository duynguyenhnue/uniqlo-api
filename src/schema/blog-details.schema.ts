import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
@Schema({timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})
export class Blogdetails extends Document{
    @Prop({required:true})
    Name:string;
    @Prop({required:true})
    Email:string;
    @Prop({required:true})
    Phone:string;
    @Prop({required:true})
    Comment:string;
}
export const BlogdetailsSchema=SchemaFactory.createForClass(Blogdetails)