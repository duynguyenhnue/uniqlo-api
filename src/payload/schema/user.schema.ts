import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ unique: true })
  userId: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ lowercase: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  profilePictureUrl: string;

  @Prop()
  bio: string;

  @Prop()
  location: string;

  @Prop([String])
  interests: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
