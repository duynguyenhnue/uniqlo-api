import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateMessageRequest } from "src/payload/request/message.request";
import { Message } from "src/schema/message.schema";

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>
  ) {}

  async sendMessage(
    createMessageRequest: CreateMessageRequest
  ): Promise<Message> {
    const createdMessage = new this.messageModel(createMessageRequest);
    return createdMessage.save();
  }

  async findMessagesByUserId(userId: string): Promise<Message[]> {
    return this.messageModel
      .find({ $or: [{ sender: userId }, { receiver: userId }] })
      .exec();
  }

  async deleteMessage(messageId: string): Promise<void> {
    const result = await this.messageModel.findByIdAndDelete(messageId).exec();
    if (!result) {
      throw new NotFoundException(`Message with ID ${messageId} not found`);
    }
  }
}
