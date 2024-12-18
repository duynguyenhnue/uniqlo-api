import { Type } from "class-transformer";
import { IsOptional, Max, ValidateNested } from "class-validator";

import { IsNumber, Min } from "class-validator";

import { IsNotEmpty } from "class-validator";

import { IsString } from "class-validator";

export class ReplyReviewRequest {
  @IsString()
  @IsNotEmpty()
  reviewText: string; 

  @IsString()
  @IsOptional()
  userId?: string;
}

export class CreateReviewRequest {
  @IsString()
  @IsNotEmpty()
  reviewText: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @ValidateNested()
  @Type(() => ReplyReviewRequest)
  @IsOptional()
  reply?: ReplyReviewRequest;
}