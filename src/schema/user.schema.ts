import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' } })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: [String], default: [] })
  deviceTokens: string[];

  @Prop({ default: '' })
  advice: string;

  @Prop({ default: Date.now })
  createAt: Date;

  @Prop({ default: true })
  status: boolean;

  @Prop({ default: 'USER' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
