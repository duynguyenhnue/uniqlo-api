import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

@Schema({ timestamps: true })
export class Photo extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: "Trip" })
  trip: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: "User" })
  userId: Types.ObjectId;

  @Prop({ required: true })
  photoUrl: string;

  @Prop()
  description: string;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
