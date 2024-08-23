import { IsMongoId, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateActivityRequest {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  activityType: string;

  @IsString()
  @IsOptional()
  activityData?: string;
}

export class UpdateActivityRequest {
  @IsMongoId()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  activityType?: string;

  @IsString()
  @IsOptional()
  activityData?: string;
}
