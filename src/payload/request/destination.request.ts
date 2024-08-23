import { IsMongoId, IsString, IsNumber, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDestinationRequest {
  @IsMongoId()
  @IsNotEmpty()
  trip: string;

  @IsString()
  @IsNotEmpty()
  locationName: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsNotEmpty()
  arrivalDate: Date;

  @IsDate()
  @IsNotEmpty()
  departureDate: Date;
}

export class UpdateDestinationRequest {
  @IsMongoId()
  @IsOptional()
  trip?: string;

  @IsString()
  @IsOptional()
  locationName?: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  arrivalDate?: Date;

  @IsDate()
  @IsOptional()
  departureDate?: Date;
}
