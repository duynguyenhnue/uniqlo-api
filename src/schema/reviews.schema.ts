import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ReplyReviewRequest } from "src/payload/request/review.request";

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ type: Types.ObjectId })
  id: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  productId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "user", required: true })
  userId: string;

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
}

export const ReviewSchema = SchemaFactory.createForClass(Review);