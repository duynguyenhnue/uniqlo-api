import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, IsString, Min } from "class-validator";


export class CreateBlogdetailRequest{
    @IsOptional()
    @IsString()
    Name:string;

    @IsOptional()
    @IsString()
    Phone:string;

    @IsOptional()
    @IsString()
    Comment:string;
    
}
export class UpdateBlogdetailRequest{
    @IsOptional()
    @IsString()
    Name?:string;

    @IsOptional()
    @IsString()
    Phone?:string;

    @IsOptional()
    @IsString()
    Comment?:string; 
}
export class SearchBlogdetailRequest{
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
  Comment?: string;
}
