import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";
import { GroupPermission, Status } from "src/enums/permission.enum";
import { AUTH_PERMISSIONS } from "src/enums/auth.enum";

export class CreateAndUpdatePermissionRequest {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(AUTH_PERMISSIONS)
  code: AUTH_PERMISSIONS;

  @IsEnum(GroupPermission)
  group: GroupPermission;

  @IsEnum(Status)
  status: Status;
}

export class GetListPermissionCommonRequest {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number;
}
