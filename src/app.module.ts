import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./api/user/user.module";
import { AuthModule } from "./api/auth/auth.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://stu715105064:ZeClf5THTVJyp5Jr@cluster0.yyq3k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    ),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
