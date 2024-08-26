import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { RefreshTokenRequest } from "src/payload/request/refresh-token.request";
import { User } from "src/schema/user.schema";
import { RefreshToken } from "src/schema/refresh-token.schema";
import { UserService } from "../users/users.service";
import { CreateUserRequest } from "src/payload/request/users.request";
import {
  AuthLogoutRequest,
  AuthRequest,
} from "src/payload/request/auth.request";
import { CommonException } from "src/common/exception/common.exception";
import { RefreshTokenService } from "../refresh-token/refresh-token.service";
import * as crypto from "crypto";
import { RefreshTokenResponse } from "src/payload/response/refresh-token.request";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  async validateUser(authRequest: AuthRequest): Promise<any> {
    const user = await this.userService.findUserByEmail(authRequest.email);
    if (user && (await bcrypt.compare(authRequest.password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(authRequest: AuthRequest): Promise<any> {
    const user = await this.validateUser(authRequest);

    if (!user) {
      throw new CommonException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    const payload = { email: user.email, sub: user._id };
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || "JWT_SECRET",
      expiresIn: "15m",
    });
    const refresh_token = crypto.randomBytes(16).toString("hex");

    await this.refreshTokenService.storeToken(user._id, refresh_token);

    return { access_token, refresh_token };
  }

  async registerUser(createUserRequest: CreateUserRequest): Promise<User> {
    const existingAuth = await this.userService.findUserByEmail(
      createUserRequest.email
    );

    if (existingAuth) {
      throw new CommonException(
        `User width { Email: ${createUserRequest.email} } exists`,
        HttpStatus.CONFLICT
      );
    }

    const hashedPassword = await bcrypt.hash(createUserRequest.password, 10);
    const createdUser = new this.userModel({
      ...createUserRequest,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async refreshToken(
    refreshTokenRequest: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> {
    return await this.refreshTokenService.refreshToken(refreshTokenRequest);
  }

  async logout(refresh_token: AuthLogoutRequest) {
    await this.refreshTokenService.deleteToken(refresh_token);
  }
}
