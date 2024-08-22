import { IsString, IsEmail, IsOptional, IsArray } from 'class-validator';

export class CreateUserRequest {
    @IsString()
    firstName: string;
  
    @IsString()
    lastName: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    password: string;
  
    @IsOptional()
    @IsString()
    profilePictureUrl?: string;
  
    @IsOptional()
    @IsString()
    bio?: string;
  
    @IsOptional()
    @IsString()
    location?: string;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    interests?: string[];
}

export class UpdateUserRequest {
    @IsOptional()
    @IsString()
    firstName?: string;
  
    @IsOptional()
    @IsString()
    lastName?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    password?: string;
  
    @IsOptional()
    @IsString()
    profilePictureUrl?: string;
  
    @IsOptional()
    @IsString()
    bio?: string;
  
    @IsOptional()
    @IsString()
    location?: string;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    interests?: string[];
  }