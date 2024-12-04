import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { RefreshTokenModule } from "../refresh-token/refresh-token.module";
import { AuthModule } from "../auth/auth.module";
import { PermissionModule } from "../permission/permission.module";
import { RoleModule } from "../roles/role.module";
import { Contact, ContactSchema } from "src/schema/contact.schema";
import { ContactService } from "./contact.service";
import { ContactController } from "./contact.controller";
@Module({
    imports:[MongooseModule.forFeature([{name:Contact.name,schema:ContactSchema}]),
    forwardRef(()=>RefreshTokenModule),
    forwardRef(()=>AuthModule),
    forwardRef(()=>PermissionModule),
    forwardRef(()=>RoleModule)

],
providers:[ContactService],
controllers:[ContactController],
})
export class ContactModule{}