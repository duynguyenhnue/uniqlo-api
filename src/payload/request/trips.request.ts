import { IsString, IsNotEmpty, IsDateString, IsMongoId, IsOptional } from 'class-validator';

export class CreateTripsRequest {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  tripName: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateTripsRequest {
  @IsMongoId()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  tripName?: string;

  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @IsString()
  @IsOptional()
  description?: string;
}
