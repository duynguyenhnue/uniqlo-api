import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { Permission, PermissionSchema } from "src/schema/permission.schema";
import { PermissionController } from "./permission.controller";
import { PermissionService } from "./permission.service";
import { PermissionRepository } from "src/repositories/permission.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "JWT_SECRET",
      signOptions: { expiresIn: "15m" },
    }),
  ],

  controllers: [PermissionController],
  providers: [PermissionService, PermissionRepository],
  exports: [PermissionService, MongooseModule, PermissionRepository],
})
export class PermissionModule {}
