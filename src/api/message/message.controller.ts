import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from 'src/payload/schema/message.schema';
import { CreateMessageRequest } from 'src/payload/request/message.request';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async sendMessage(@Body() createMessageRequest: CreateMessageRequest): Promise<Message
  > {
    return this.messageService.sendMessage(createMessageRequest);
  }

  @Get(':userId')
  async getMessagesByUser(@Param('userId') userId: string): Promise<Message[]> {
    return this.messageService.findMessagesByUserId(userId);
  }

  @Delete(':messageId')
  async deleteMessage(@Param('messageId') messageId: string): Promise<void> {
    return this.messageService.deleteMessage(messageId);
  }
}
