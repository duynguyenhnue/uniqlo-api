import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./users.service";
import { User } from "src/payload/schema/user.schema";
import {
  CreateUserRequest,
  UpdateUserRequest,
} from "src/payload/request/users.request";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.gaurd";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  async getUser(@Param("id") id: string): Promise<User> {
    try {
      const user = await this.userService.findUserById(id);
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Failed to retrieve user");
    }
  }

  @Put(":id")
  async updateUser(
    @Param("id") id: string,
    @Body() updateUserRequest: UpdateUserRequest
  ): Promise<User> {
    try {
      const user = await this.userService.updateUser(id, updateUserRequest);
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Failed to update user");
    }
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string): Promise<void> {
    try {
      await this.userService.deleteUser(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Failed to delete user");
    }
  }
}
