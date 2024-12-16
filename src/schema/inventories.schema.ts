import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Inventory extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    productId: Types.ObjectId;

    @Prop({ required: true })
    quantity: number;

    @Prop()
    userId: string;

    @Prop()
    color: string;

    @Prop()
    size: string;   

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const InventoriesSchema = SchemaFactory.createForClass(Inventory);
