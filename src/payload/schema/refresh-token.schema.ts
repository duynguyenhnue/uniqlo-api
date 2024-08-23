import { Schema, Document } from 'mongoose';


export class RefreshToken  extends Document{
  userId: string;
  refreshToken: string;
  expiresAt: Date;
}

export const RefreshTokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  refreshToken: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});
