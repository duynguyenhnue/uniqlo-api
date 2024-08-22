import {
  Controller,
  Post,
  Body,
  Logger,
  ConflictException,
  Get,
  Param,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest, UpdateUserRequest } from 'src/payload/request/users.request';
import { UserResponse } from 'src/payload/response/users.request';
import { User } from 'src/payload/schema/user.schema';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() req: CreateUserRequest): Promise<User> {
    try {
      const user = await this.userService.create(req);
      return user;
    } catch (err) {
      this.logger.error('Error in create user:', err);
      throw err;
    }
  }

  @Put(':id')
  async update(
    @Param('id') userId: string,
    @Body() UpdateUserRequest: UpdateUserRequest,
  ): Promise<User> {
    try {
      const user = await this.userService.update(userId, UpdateUserRequest);
      return user;
    } catch (err) {
      this.logger.error('Error in update user:', err);
      throw err;
    }
  }

  @Get(':id')
  async findByUserId(@Param('id') userId: string): Promise<User> {
    try {
      const user = await this.userService.findByUserId(userId);
      return user;
    } catch (err) {
      this.logger.error('Error in find user by id:', err);
      throw err;
    }
  }

  @Delete(':id')
  async delete(@Param('id') userId: string): Promise<void> {
    try {
      await this.userService.delete(userId);
    } catch (err) {
      this.logger.error('Error in delete user:', err);
      throw err;
    }
  }
}
