import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { Types, Document } from "mongoose";

@Schema({ timestamps: true })
export class Order extends Document {

  @Prop({ required: true, type: Types.ObjectId, ref: 'users' })
  userId: Types.ObjectId;

  @Prop({
    type: [{
      productId: { type: Types.ObjectId, ref: 'Products', required: true },
      count: { type: Number, required: true, default: 1 },
      totalPrice: { type: Number, require: true, default: 0 }
    }], require: true
  })
  @Type(() => Object)
  orderItems: {
    productId: Types.ObjectId;
    count: number;
    totalPrice: number;
  }[];

  @Prop({ type: Number, required: true })
  totalAmount: number;

  @Prop({ type: Types.ObjectId, ref: 'discounts', default: null })
  discountId: Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  discountAmount: number;

  @Prop({ required: true, type: Number })
  finalAmount: number;

  @Prop({
    type: String,
    enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
    default: 'Pending'
  })
  status: string;

  createdAt: Date;
  updatedAt: Date;
}
export const OrderSchema = SchemaFactory.createForClass(Order);