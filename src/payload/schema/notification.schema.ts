import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Notification extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop()
  type: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  relatedUserId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Post' })
  relatedPostId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Comment' })
  relatedCommentId: Types.ObjectId;

  @Prop({ default: false })
  read: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
