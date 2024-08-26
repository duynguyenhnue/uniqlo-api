import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';


@Schema({ timestamps: true })
export class Destination  extends Document{
  @Prop({ required: true, type: Types.ObjectId, ref: 'Trip' })
  trip: Types.ObjectId;

  @Prop({ required: true })
  locationName: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop()
  description: string;

  @Prop({ required: true })
  arrivalDate: Date;

  @Prop({ required: true })
  departureDate: Date;
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);
