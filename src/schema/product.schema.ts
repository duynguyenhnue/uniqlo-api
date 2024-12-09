import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Product extends Document {
  @Prop({ required: true })
  Product_name: string;

  @Prop({ required: true, unique: true })
  Product_sku: string;

  @Prop({ required: true })
  Product_description: string;

  @Prop({ required: true })
  Product_currency: string;

  @Prop({ required: true })
  Product_color: string[];

  @Prop({ required: true })
  Product_size: string;

  @Prop()
  Product_variantSku: string;

  @Prop()
  Product_specifications: string;

  @Prop({ required: true, type: Number })
  Product_price: number;

  @Prop({ default: 0, type: Number })
  Product_rating: number;

  @Prop({ default: 0, type: Number })
  Product_count: number;

  @Prop({ default: "" })
  Product_images: string;

  @Prop({ default: false })
  Product_isNewArrival: boolean;

  @Prop({ default: false })
  Product_isBestSeller: boolean;

  @Prop({ default: false })
  Product_isOnSale: boolean;
  
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;
}


export const ProductSchema = SchemaFactory.createForClass(Product);
