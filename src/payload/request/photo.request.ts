import { IsMongoId, IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreatePhotoRequest {
  @IsMongoId()
  @IsNotEmpty()
  trip: string;

  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsUrl()
  @IsNotEmpty()
  photoUrl: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdatePhotoRequest {
  @IsMongoId()
  @IsOptional()
  trip?: string;

  @IsMongoId()
  @IsOptional()
  userId?: string;

  @IsUrl()
  @IsOptional()
  photoUrl?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
