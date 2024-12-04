import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class FavoriteProduct extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'Product' }])
  productIds: Types.ObjectId[];
}
export const FavoriteProductSchema = SchemaFactory.createForClass(FavoriteProduct);
