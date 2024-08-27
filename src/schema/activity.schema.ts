import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';


@Schema({ timestamps: true })
export class Activity  extends Document{
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  activityType: string;

  @Prop()
  activityData: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
