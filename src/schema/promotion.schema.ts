import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Promotion extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    code: string;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    value: number;

    @Prop({ required: true })
    minOrderValue: number;

    @Prop()
    maxDiscount: number;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ required: true })
    usageLimit: number;

    @Prop({ default: 0 })
    usageCount: number;

    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    productId: Types.ObjectId;

    @Prop()
    device: string;

    @Prop({ required: true })
    status: string;
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
