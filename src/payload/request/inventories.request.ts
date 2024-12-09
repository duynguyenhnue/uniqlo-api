import { Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsInt,
  IsPositive,
  IsMongoId,
  IsArray,
  Min,
} from "class-validator";

export class CreateInventoryRequest {
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  variantSku: string;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsInt()
  @IsPositive()
  reservedQuantity: number;

  @IsBoolean()
  lowStockThreshold: boolean;

  @IsString()
  @IsNotEmpty()
  warehouseLocation: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  size?: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  history?: string[];
}

export class UpdateInventoryRequest {
  @IsOptional()
  @IsMongoId()
  productId?: string;

  @IsOptional()
  @IsString()
  variantSku?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  reservedQuantity?: number;

  @IsOptional()
  @IsBoolean()
  lowStockThreshold?: boolean;

  @IsOptional()
  @IsString()
  warehouseLocation?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  history?: string[];
}

export class SearchInventoryRequest {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsMongoId()
  productId?: string;

  @IsOptional()
  @IsString()
  warehouseLocation?: string;
}
