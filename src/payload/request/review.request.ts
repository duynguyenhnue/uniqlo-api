import { IsMongoId, IsNumber, IsString, IsNotEmpty, IsOptional, Min, Max } from 'class-validator';

export class CreateReviewRequest {
  @IsMongoId()
  @IsNotEmpty()
  trip: string;

  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsOptional()
  comment?: string;
}


export class UpdateReviewRequest {
  @IsMongoId()
  @IsOptional()
  trip?: string;

  @IsMongoId()
  @IsOptional()
  userId?: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @IsString()
  @IsOptional()
  comment?: string;
}
