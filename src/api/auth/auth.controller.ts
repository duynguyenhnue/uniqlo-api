import { Controller, Post, Body, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenRequest } from 'src/payload/request/refresh-token.request';
import { SkipAuth } from 'src/config/skip.auth';
import { CreateUserRequest } from 'src/payload/request/users.request';
import { User } from 'src/payload/schema/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('login')
  async login(@Body() loginUserRequest: any): Promise<any> {
    return this.authService.login(loginUserRequest.email, loginUserRequest.password);
  }

  @SkipAuth()
  @Post('register')
  async register(@Body() createUserRequest: CreateUserRequest): Promise<User> {
    try {
      return await this.authService.registerUser(createUserRequest);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenRequest: RefreshTokenRequest): Promise<any> {
    return this.authService.refreshToken(refreshTokenRequest);
  }
}
