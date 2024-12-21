import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ReplyReviewRequest } from "../payload/request/review.request";

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ type: Types.ObjectId, ref: "product", required: true })
  productId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "user", required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  reviewText: string;

  @Prop({ required: true, min: 0, max: 5, default: 0 })
  rating: number;

  @Prop({ required: false })
  avatar?: string;

  @Prop({ required: false })
  fullName?: string;

  @Prop({ required: false })
  createdAt?: Date;

  @Prop({ required: false })
  updatedAt?: Date;

  @Prop({ type: [ReplyReviewRequest], required: false })
  reply?: ReplyReviewRequest[];

  @Prop({ type: String, required: false })
  productName?: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
