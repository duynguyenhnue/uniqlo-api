import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { GroupPermission, Status } from "../enums/permission.enum";

@Schema({
  collection: "permissions",
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Permission extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: Object.values(GroupPermission) })
  group: GroupPermission;

  @Prop({ default: "1.0.0" })
  version: string;

  @Prop({
    type: String,
    enum: Object.values(Status),
  })
  status: Status;

  @Prop({ default: Date.now })
  createdAt: number;

  @Prop({ default: Date.now })
  updatedAt: number;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);

export type PermissionDocument = Permission & Document;
