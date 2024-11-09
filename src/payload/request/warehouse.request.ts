
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsBoolean, IsArray, IsMongoId, IsDate, IsPositive, IsInt } from 'class-validator';

export class CreateWarehouseRequest {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  address: string;

  @IsArray()
  staff: string[]; 

  @IsBoolean()
  isActive: boolean;
}

export class UpdateWarehouseRequest {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsArray()
  staff?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class SearchWarehouseRequest {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;

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
}
