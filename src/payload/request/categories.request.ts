import { Type } from "class-transformer";
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDateString,
  Length,
  ValidateNested,
  IsInt,
  IsPositive,
  Min,
  IsMongoId,
} from "class-validator";
import { Types } from "mongoose";
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
  
    // @IsString()
    // @IsOptional()
    // size?: string;
  
    // @IsString()
    // @IsOptional()
    // color?: string;
  
    @IsString()
    @IsOptional()
    material?: string;
  
    @IsString()
    @IsOptional()
    status?: string;

    // @IsMongoId()
    // @IsOptional()
    // product_id:Types.ObjectId
  
  }
  
  export class UpdateCategoryRequest {
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
  
    // @IsOptional()
    // @IsString()
    // size?: string;
  
    // @IsOptional()
    // @IsString()
    // color?: string;
  
    @IsOptional()
    @IsString()
    material?: string;
  
    @IsOptional()
    @IsString()
    status?: string;

    // @IsMongoId()
    // @IsOptional()
    // product_id?:Types.ObjectId


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