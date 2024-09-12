import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/api/users/users.module";
import { RefreshToken, RefreshTokenSchema } from "src/schema/refresh.schema";
import { RefreshTokenService } from "./refresh-token.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
    forwardRef(() => UserModule),
  ],
  providers: [RefreshTokenService, JwtService],
  exports: [RefreshTokenService, MongooseModule],
})
export class RefreshTokenModule {}
