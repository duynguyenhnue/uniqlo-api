import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, IsString, Min } from "class-validator";


export class CreateContactRequest{
    @IsOptional()
    @IsString()
    Name:string;

    @IsOptional()
    @IsString()
    Email:string;

    @IsOptional()
    @IsString()
    Message:string;
    
}
export class UpdateContactRequest{
    @IsOptional()
    @IsString()
    Name?:string;

    @IsOptional()
    @IsString()
    Email?:string;

    @IsOptional()
    @IsString()
    Message?:string; 
}
export class SearchContactRequest{
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
  Message?: string;
}
