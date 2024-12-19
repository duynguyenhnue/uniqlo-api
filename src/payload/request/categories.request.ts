import { Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsInt,
  IsPositive,
  Min,
} from "class-validator";
export class CreateCategoryRequest {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    image: string;
  
    @IsInt()
    @IsPositive()
    order: number;
  
    @IsBoolean()
    featured: boolean;
  
    @IsString()
    @IsOptional()
    material?: string;
  
    @IsString()
    @IsOptional()
    status?: string;  
  }
  
  export class UpdateCategoryRequest{
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsString()
    image?: string;
  
    @IsOptional()
    @IsInt()
    @IsPositive()
    order?: number;
  
    @IsOptional()
    @IsBoolean()
    featured?: boolean;
  
    @IsOptional()
    @IsString()
    material?: string;
  
    @IsOptional()
    @IsString()
    status?: string;
  }
  export class SearchCategorybyNameRequest{
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
    @IsString()
    name?: string;
  
    
  }