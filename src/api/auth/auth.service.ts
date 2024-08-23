import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RefreshTokenRequest } from 'src/payload/request/refresh-token.request';
import { User } from 'src/payload/schema/user.schema';
import { RefreshToken } from 'src/payload/schema/refresh-token.schema';
import { UserService } from '../users/users.service';
import { CreateUserRequest } from 'src/payload/request/users.request';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(RefreshToken.name) private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user._id };
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'JWT_SECRET',
    });
    const refreshToken = this.jwtService.sign(payload, { secret: process.env.JWT_REFRESH_SECRET || 'refreshSecretKey', expiresIn: '7d' });
    
    await this.refreshTokenModel.create({
      user: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    
    return { access_token, refreshToken };
  }

  async registerUser(createUserRequest: CreateUserRequest): Promise<User> {
    const user = await this.userService.findUserByEmail(createUserRequest.email);
    if (user) {
      throw new NotFoundException(`User with Email ${createUserRequest.email} exists`);
    }
    const hashedPassword = await bcrypt.hash(createUserRequest.password, 10);
    const createdUser = new this.userModel({
      ...createUserRequest,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async refreshToken(refreshTokenRequest: RefreshTokenRequest): Promise<any> {
    const { refreshToken } = refreshTokenRequest;
    const token = await this.refreshTokenModel.findOne({ refreshToken }).exec();
  
    if (!token || new Date() > token.expiresAt) {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }
  
    const user = await this.userService.findUserById(token.userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
  
    const payload = { email: user.email, sub: user._id};
    const access_token = this.jwtService.sign(payload);
    
    return { access_token };
  }
  
  
}
