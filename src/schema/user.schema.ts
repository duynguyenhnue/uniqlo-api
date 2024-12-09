import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
class Address {
  @Prop({ required: true })
  province: string;

  @Prop({ required: true })
  district: string;

  @Prop({ required: true })
  ward: string;
}

@Schema()
class Phone {
  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  number: string;
}
@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Phone, required: true })
  phone: Phone;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ type: Address, required: true ,default: null})
  address: Address;

  @Prop({ type: [String], default: [] })
  deviceTokens: string[];

  @Prop({ default: '' })
  advice: string;

  @Prop({ default: 'ACTIVE' })
  status: string;

  @Prop({ default: 'USER' })
  role: string;

  @Prop({ default: 'Male' })
  gender: string;

  @Prop({ type: [Types.ObjectId], default: [] })
  product_Id: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
