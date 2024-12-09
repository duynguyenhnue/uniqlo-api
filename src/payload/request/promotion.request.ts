import { Type } from "class-transformer";
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsInt,
    IsDate,
    IsPositive,
    Length,
    Min,
    IsDateString,
} from "class-validator";

export class CreatePromotionRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @Length(3, 10)
    code: string;

    @IsString()
    type: string;

    @IsInt()
    @IsPositive()
    value: number;

    @IsInt()
    @IsPositive()
    minOrderValue: number;

    @IsOptional()
    @IsInt()
    maxDiscount?: number;

    @IsDateString() 
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsInt()
    usageLimit: number;

    @IsOptional()
    @IsString()
    productId?: string;

    @IsOptional()
    @IsString()
    device?: string;

    @IsString()
    status: string;
}

export class UpdatePromotionRequest {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    code?: string;

    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    value?: number;

    @IsOptional()
    @IsInt()
    minOrderValue?: number;

    @IsOptional()
    @IsInt()
    maxDiscount?: number;

    @IsDateString()
    @IsOptional()
    startDate?: string|Date;

    @IsDateString()
    @IsOptional()
    endDate?: string|Date;

    @IsOptional()
    @IsInt()
    usageLimit?: string;

    @IsOptional()
    @IsString()
    productId?: string;

    @IsOptional()
    @IsString()
    device?: string;

    @IsOptional()
    @IsString()
    status?: string;
}

export class SearchPromotionRequest {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    page?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    limit?: number;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    code?: string;
}
