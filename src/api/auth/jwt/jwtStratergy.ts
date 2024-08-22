import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(private authservice: AuthService) {
    super(); 
  }

  async validate(
    email: string,
    password: string,
  ): Promise<any> {
    const user =
      await this.authservice.validateUser(
        email,
        password,
      );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}