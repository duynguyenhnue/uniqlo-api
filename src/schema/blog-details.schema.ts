import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsPhoneNumber, IsString } from "class-validator";
import { Document, Types } from "mongoose";

@Schema({timestamps:true})
export class Comments extends Document{
    @Prop({required:true})
    @IsString()
    name:string;

    @Prop({required:true})
    @IsEmail()
    email:string;

    @Prop({required:true})
    @IsString()
    phone:string;

    @Prop({required:true})
    @IsString()
    comment:string;

    createdAt: Date;
    updatedAt: Date;
}

@Schema({timestamps:true})
export class Blogdetails extends Document{
    @Prop({required:true})
    title:string;

    @Prop({required:true})
    image:string;

    @Prop({required:true})
    content:string;

    @Prop({required:true})
    author:string;

    @Prop({default:0,min:0})
    commentcount:number;

    @Prop({type:[{type:Types.ObjectId,ref:'Comments'}],default:[]})
    comment:Comments[];

    createdAt: Date;
    updatedAt: Date;
}
export const BlogdetailsSchema=SchemaFactory.createForClass(Blogdetails)
export const CommentSchema = SchemaFactory.createForClass(Comments);
