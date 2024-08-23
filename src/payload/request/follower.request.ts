import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateFollowerRequest {
  @IsMongoId()
  @IsNotEmpty()
  user: string;

  @IsMongoId()
  @IsNotEmpty()
  followerUser: string;
}
