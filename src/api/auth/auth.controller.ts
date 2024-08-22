import {
  Controller,
  Post,
  Logger,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategy/local-auth.gaurd';
import { JwtAuthGuard } from './jwt/jwt-auth.gaurd';

@Controller('auth')
export class AuthController {
  logger: Logger;
  constructor(
    private readonly authService: AuthService,
  ) {
    this.logger = new Logger(AuthController.name);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<any> {
    try {
      return await this.authService.generateJwtToken(req.user);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('viewProfile')
  async getUser(@Request() req): Promise<any> {
    return req.user;
  }
}
