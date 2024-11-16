import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, IsBoolean, IsOptional, IsEnum, IsMongoId, IsInt, IsPositive } from 'class-validator';
import { Types } from 'mongoose';

export class ProductCreateRequest  {
  @IsString()
  Product_name: string;

  @IsString()
  Product_sku: string;

  @IsString()
  Product_description: string;

  @IsString()
  Product_currency: string;

  @IsString()
  Product_color: string;

  @IsString()
  Product_size: string;

  @IsOptional()
  @IsString()
  Product_variantSku?: string;

  @IsOptional()
  @IsString()
  Product_specifications?: string;

  @IsNumber()
  Product_price: number;

  @IsOptional()
  @IsNumber()
  Product_rating?: number;

  @IsOptional()
  @IsNumber()
  Product_count?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  Product_images?: string[];

  @IsBoolean()
  Product_isNewArrival: boolean;

  @IsBoolean()
  Product_isBestSeller: boolean;

  @IsBoolean()
  Product_isOnSale: boolean;

  @IsMongoId()
  categoryId: Types.ObjectId;
}
export class ProductUpdateRequest {
  @IsOptional()
  @IsString()
  Product_name?: string;

  @IsOptional()
  @IsString()
  Product_sku?: string;

  @IsOptional()
  @IsString()
  Product_description?: string;

  @IsOptional()
  @IsString()
  Product_currency?: string;

  @IsOptional()
  @IsString()
  Product_color?: string;

  @IsOptional()
  @IsString()
  Product_size?: string;

  @IsOptional()
  @IsString()
  Product_variantSku?: string;

  @IsOptional()
  @IsString()
  Product_specifications?: string;

  @IsOptional()
  @IsNumber()
  Product_price?: number;

  @IsOptional()
  @IsNumber()
  Product_rating?: number;

  @IsOptional()
  @IsNumber()
  Product_count?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  Product_images?: string[];

  @IsOptional()
  @IsBoolean()
  Product_isNewArrival?: boolean;

  @IsOptional()
  @IsBoolean()
  Product_isBestSeller?: boolean;

  @IsOptional()
  @IsBoolean()
  Product_isOnSale?: boolean;

  @IsOptional()
  @IsMongoId()
  categoryId?: Types.ObjectId;
}
export class ProductSearchRequest {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()  
  @Type(() => Number)
  limit?: number;


  @IsOptional()
  @IsString()
  Product_name?: string;

  @IsOptional()
  @IsString()
  @Type(() => Number)
  Product_price?:number
}
