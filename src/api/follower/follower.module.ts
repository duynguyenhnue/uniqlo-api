import { forwardRef, Module } from "@nestjs/common";
import { FollowerService } from "./follower.service";
import { FollowerController } from "./follower.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Follower, FollowerSchema } from "src/schema/follower.schema";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Follower.name, schema: FollowerSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [FollowerController],
  providers: [FollowerService],
  exports: [FollowerService],
})
export class FollowerModule {}
