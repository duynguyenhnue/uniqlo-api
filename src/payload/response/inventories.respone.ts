import { Type } from "class-transformer";
import { Types } from "mongoose";

export class InventoryResponse {
  @Type(() => String)
  id: string;

  productId: Types.ObjectId;

  variantSku: string;

  quantity: number;

  reservedQuantity: number;

  lowStockThreshold: boolean;

  warehouseLocation: string;

  color: string;

  size: string;

  status: string;

  history: string[];
}
