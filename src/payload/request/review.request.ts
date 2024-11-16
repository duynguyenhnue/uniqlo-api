import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsMongoId, Min, Max, IsInt } from 'class-validator';
import { Types } from 'mongoose';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
export class CreateReview {
    @IsNotEmpty() @IsMongoId() productId: Types.ObjectId;
    @IsNotEmpty() @IsMongoId() userId: Types.ObjectId;
    @IsNotEmpty() @IsNumber() @Min(1) @Max(5) rating: number;
    @IsNotEmpty() @IsString() title: string;
    @IsNotEmpty() @IsString() content: string;
    @IsOptional() @IsArray() @IsString({ each: true }) image: string[];
    @IsOptional() @IsNumber() like: number;
    @IsNotEmpty() @IsString() status: string;
    @IsOptional() @IsArray() @IsString({ each: true }) size: string[];
    @IsNotEmpty() @IsString() color: string;
  }
  export class UpdateReview {
    @IsMongoId() productId?: Types.ObjectId;
    @IsMongoId() userId?: Types.ObjectId;
    @IsNumber() @Min(1) @Max(5) rating?: number;
    @IsString() title?: string;
    @IsString() content?: string;
    @IsArray() @IsString({ each: true }) image?: string[];
    @IsNumber() like?: number;
    @IsString() status?: string;
    @IsArray() @IsString({ each: true }) size?: string[];
    @IsString() color?: string;
  }
  export class SearchReview {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    page?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    limit?: number;

    @IsOptional()
    @IsString()
    title?: string;
  }    