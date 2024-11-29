import { IsMongoId } from 'class-validator';

export class CreateFavoriteDto {
  @IsMongoId()
  readonly productId: string;
}