import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class TravelGroup extends Document {
  @Prop()
  groupName: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  adminUserId: Types.ObjectId;

  @Prop()
  description: string;

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  members: Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TravelGroupSchema = SchemaFactory.createForClass(TravelGroup);
