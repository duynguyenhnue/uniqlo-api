import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { Role, RoleSchema } from "src/schema/role.schema";
import { RoleRepository } from "src/repositories/role.repository";
import { JwtModule } from "@nestjs/jwt";
import { AuthJwtRoleGuard } from "src/common/guards/role.guard";
import { PermissionModule } from "../permission/permission.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "JWT_SECRET",
      signOptions: { expiresIn: "15m" },
    }),
    PermissionModule,
  ],

  controllers: [RoleController],
  providers: [RoleService, RoleRepository, AuthJwtRoleGuard],
  exports: [RoleService, MongooseModule, RoleRepository],
})
export class RoleModule {}
