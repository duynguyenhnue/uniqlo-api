import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsMongoId, Min, Max, IsInt } from 'class-validator';
import { Types } from 'mongoose';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
export class CreateReview {
    @IsNotEmpty() @IsMongoId() productId: Types.ObjectId;
    @IsNotEmpty() @IsNumber() @Min(1) @Max(5) rating: number;
    @IsNotEmpty() @IsString() title: string;
    @IsNotEmpty() @IsString() content: string;
    @IsOptional() @IsArray() @IsString({ each: true }) size: string[];
    @IsNotEmpty() @IsString() color: string;
  }
  export class UpdateReview {
    @IsMongoId() productId?: Types.ObjectId;
    @IsNumber() @Min(1) @Max(5) rating?: number;
    @IsString() title?: string;
    @IsString() content?: string;
    @IsArray() @IsString({ each: true }) size?: string[];
    @IsString() color?: string;
  }
  export class SearchReview {
    @IsOptional()
    @Type(() => Number)
  @IsInt()
  @Min(0)
    page?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsString()
    title?: string;
  }    