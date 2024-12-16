import { Type } from "class-transformer";
import { Types } from "mongoose";

export class InventoryResponse {
  @Type(() => String)
  id: string;

  productId: Types.ObjectId;

  quantity: number;

  color: string;

  size: string;

  userId: string;

  createdAt: Date;

  updatedAt: Date;

  name?: string;

  price?: number;

  image?: string;

  sizes?: string[];

  colors?: string[];
}
