import { Module, forwardRef } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../users/users.module";
import { JwtStrategy } from "../../common/guard/jwt/jwtStratergy";
import { RefreshTokenModule } from "../refresh-token/refresh-token.module";
import { UserService } from "../users/users.service";
import { RefreshTokenStrategy } from "../refresh-token/refresh-token.strategy";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "JWT_SECRET",
      signOptions: { expiresIn: "15m" },
    }),
    forwardRef(() => UserModule),
    RefreshTokenModule,
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService],
  exports: [AuthService],
})
export class AuthModule {}
