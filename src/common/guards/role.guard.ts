import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  SetMetadata,
  UseGuards,
  applyDecorators,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CommonException } from "../exception/common.exception";
import {
  AUTH_PERMISSIONS,
  AUTH_PERMISSION_META_KEY,
} from "src/enums/auth.enum";
import { RoleRepository } from "src/repositories/role.repository";
import { Role } from "src/schema/role.schema";
import { PermissionRepository } from "src/repositories/permission.repository";
import { Permission } from "src/schema/permission.schema";
import { JwtAuthGuard } from "./jwt-auth.gaurd";

@Injectable()
export class AuthJwtRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission: AUTH_PERMISSIONS[] =
      this.reflector.getAllAndOverride<AUTH_PERMISSIONS[]>(
        AUTH_PERMISSION_META_KEY,
        [context.getHandler(), context.getClass()]
      );

    if (!requiredPermission) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const role: Role = await this.roleRepository.findById(user.role);

    const permissionIds: string[] = role.permissions;

    const permissions: string[] = await Promise.all(
      permissionIds.map(async (permissionId) => {
        const permission: Permission = await this.permissionRepository.findById(
          permissionId
        );
        return permission.code;
      })
    );

    const hasPermission: boolean = requiredPermission.some((permission) =>
      permissions.includes(permission)
    );

    if (!hasPermission) {
      throw new CommonException("Permission Denied", HttpStatus.FORBIDDEN);
    }

    return hasPermission;
  }
}

export function AuthJwtAccessProtected(
  ...permissions: AUTH_PERMISSIONS[]
): MethodDecorator {
  return applyDecorators(
    UseGuards(JwtAuthGuard, AuthJwtRoleGuard),
    SetMetadata(AUTH_PERMISSION_META_KEY, permissions)
  );
}
