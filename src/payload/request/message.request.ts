import { IsMongoId, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMessageRequest {
  @IsMongoId()
  @IsNotEmpty()
  senderUser: string;

  @IsMongoId()
  @IsNotEmpty()
  receiverUser: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdateMessageRequest {
  @IsString()
  @IsOptional()
  content?: string;
}
