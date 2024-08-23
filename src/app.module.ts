import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./api/users/users.module";
import { AuthModule } from "./api/auth/auth.module";
import { PhotoModule } from "./api/photo/photo.module";
import { DestinationModule } from "./api/destination/destination.module";
import { ReviewModule } from "./api/review/review.module";
import { FollowerModule } from "./api/follower/follower.module";
import { MessageModule } from "./api/message/message.module";
import { ActivityModule } from "./api/activity/activity.module";
import { TripsModule } from "./api/trips/trips.module";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD, Reflector } from "@nestjs/core";
import { JwtAuthGuard } from "./api/auth/jwt/jwt-auth.gaurd";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    AuthModule,
    TripsModule,
    PhotoModule,
    DestinationModule,
    ReviewModule,
    FollowerModule,
    MessageModule,
    ActivityModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
