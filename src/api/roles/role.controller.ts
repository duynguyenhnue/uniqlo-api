import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
} from "@nestjs/common";
import { CommonException } from "src/common/exception/common.exception";
import { CommonExceptionFilter } from "src/common/exception/http-exception.filter";
import { RoleService } from "./role.service";
import { AuthJwtAccessProtected } from "src/common/guards/role.guard";
import { AUTH_PERMISSIONS } from "src/enums/auth.enum";
import {
  CreateAndUpdateRoleRequest,
  GetListRoleCommonRequest,
} from "src/payload/request/role.request";
import { successResponse } from "src/common/dto/response.dto";

@Controller("role")
@UseFilters(CommonExceptionFilter)
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Post("create")
  @AuthJwtAccessProtected(AUTH_PERMISSIONS.ROLE_CREATE)
  async createRole(@Body() request: CreateAndUpdateRoleRequest) {
    try {
      const role = await this.service.createRole(request);
      return successResponse(role);
    } catch (error) {
      throw new CommonException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("list")
  @AuthJwtAccessProtected(AUTH_PERMISSIONS.ROLE_VIEW)
  async getListRoles(@Query() query: GetListRoleCommonRequest) {
    try {
      const roles = await this.service.getListRoles(query.page, query.limit);
      return successResponse(roles);
    } catch (error) {
      throw new CommonException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":roleId")
  @AuthJwtAccessProtected(AUTH_PERMISSIONS.ROLE_VIEW)
  async getRoleDetail(@Param("roleId") roleId: string) {
    try {
      const role = await this.service.getRoleDetail(roleId);
      return successResponse(role);
    } catch (error) {
      throw new CommonException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put("update/:roleId")
  @AuthJwtAccessProtected(AUTH_PERMISSIONS.ROLE_UPDATE)
  async updateRole(
    @Param("roleId") roleId: string,
    @Body() request: CreateAndUpdateRoleRequest
  ) {
    try {
      const role = await this.service.updateRole(roleId, request);
      return successResponse(role);
    } catch (error) {
      throw new CommonException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete("delete/:roleId")
  @AuthJwtAccessProtected(AUTH_PERMISSIONS.ROLE_DELETE)
  async deleteRole(@Param("roleId") roleId: string) {
    try {
      const role = await this.service.deleteRole(roleId);
      return successResponse(role);
    } catch (error) {
      throw new CommonException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
