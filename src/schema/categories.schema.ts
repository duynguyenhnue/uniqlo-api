import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Product } from "./product.schema";


const validCategoryTags=["PRODUCT","BAGS","SHOES","FASHIO","CLOTHING","HATS","ACCESSORIES"];
const validCategoryBrands=["Louis Vuitton","Chanel","Hermes","Gucci"];
@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Category extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true,type:String,enum:validCategoryTags })
  tags: string[];

  @Prop({ required: true,type:String,enum:validCategoryBrands })
  brands: string[];

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  order: number;

  @Prop({ required: true, default: false })
  featured: boolean;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  material: string;

  @Prop({ required: true })
  status: string;
  
  @Prop({required:true,type:Types.ObjectId,ref:'Product'})
  product_id:Types.ObjectId;
}
export const CategoriesSchema = SchemaFactory.createForClass(Category);
