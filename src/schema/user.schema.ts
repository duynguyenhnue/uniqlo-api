import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
 class Address {
  @Prop({ required: true })
  homenumber: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;
}

@Schema()
class userPhone{
  @Prop({ required: true })
  phoneCountry: string;

  @Prop({ required: true })
  phoneNumber: string;
}

@Schema({ timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' } })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type:userPhone, required: true })
  phone: userPhone;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  birthdate: Date;

  @Prop({ type: Address, required: true })
  address: Address;

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
