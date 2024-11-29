import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})
export class Contact extends Document {

@Prop({required:true})
Name:string;

@Prop({required:true})
Email:string;

@Prop({required:true})
Message:string;

}
export const ContactSchema=SchemaFactory.createForClass(Contact);