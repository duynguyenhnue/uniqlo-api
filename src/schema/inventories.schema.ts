import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })
export class Inventory extends Document {
  @Prop({ type: Types.ObjectId, ref: "Product", required: true })
  productId: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({ required: true })
  variantSku: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, default: 0 })
  reservedQuantity: number;

  @Prop({ required: true })
  lowStockThreshold: boolean;

  @Prop({ required: true })
  warehouseLocation: string;

  @Prop()
  color: string;

  @Prop()
  size: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: [String], default: [] })
  history: string[];
}

export const InventoriesSchema = SchemaFactory.createForClass(Inventory);
