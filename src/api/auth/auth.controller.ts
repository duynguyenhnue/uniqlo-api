import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RefreshTokenRequest } from "../../payload/request/refresh-token.request";
import { SkipAuth } from "../../config/skip.auth";
import { CreateUserRequest } from "../../payload/request/users.request";
import { successResponse } from "../../common/dto/response.dto";
import {
  AuthLogoutRequest,
  AuthRequest,
} from "../../payload/request/auth.request";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post("login")
  async login(@Body() authRequest: AuthRequest) {
    const result = await this.authService.login(authRequest);
    return successResponse(result);
  }

  @SkipAuth()
  @Post("register")
  async register(@Body() createUserRequest: CreateUserRequest) {
    const result = await this.authService.registerUser(createUserRequest);
    return successResponse(result);
  }
  @SkipAuth()
  @Post("refresh-token")
  async refreshToken(@Body() refreshTokenRequest: RefreshTokenRequest) {
    return successResponse(
      await this.authService.refreshToken(refreshTokenRequest)
    );
  }

  @Post("logout")
  async logout(@Body() authLogoutRequest: AuthLogoutRequest) {
    await this.authService.logout(authLogoutRequest);
    return successResponse({ message: "Logged out successfully" });
  }
}
