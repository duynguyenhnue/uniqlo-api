import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Category extends Document {
  @Prop({ required: true })
  name: string;

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
}
export const CategoriesSchema = SchemaFactory.createForClass(Category);

