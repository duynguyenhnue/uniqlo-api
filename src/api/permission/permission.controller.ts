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
import { CommonExceptionFilter } from "../../common/exception/http-exception.filter";
import { CommonException } from "../../common/exception/common.exception";
import { successResponse } from "../../common/dto/response.dto";
import { PermissionService } from "./permission.service";
import {
  CreateAndUpdatePermissionRequest,
  GetListPermissionCommonRequest,
} from "../../payload/request/permission.request";
import { SkipAuth } from "../../config/skip.auth";

@Controller("permission")
@UseFilters(CommonExceptionFilter)
export class PermissionController {
  constructor(private readonly service: PermissionService) {}

  @Post("create")
  @SkipAuth()
  async createPermission(@Body() request: CreateAndUpdatePermissionRequest) {
    try {
      const permission = await this.service.createPermission(request);
      return successResponse(permission);
    } catch (error) {
      throw new CommonException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("list")
  @SkipAuth()
  async getListPermissions(@Query() query: GetListPermissionCommonRequest) {
    try {
      const permissions = await this.service.getListPermissions(
        query.page,
        query.limit
      );
      return successResponse(permissions);
    } catch (error) {
      throw new CommonException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":permissionId")
  @SkipAuth()
  async getPermissionDetail(@Param("permissionId") permissionId: string) {
    try {
      const permission = await this.service.getPermissionDetail(permissionId);
      return successResponse(permission);
    } catch (error) {
      throw new CommonException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put("update/:permissionId")
  @SkipAuth()
  async updatePermission(
    @Param("permissionId") permissionId: string,
    @Body() request: CreateAndUpdatePermissionRequest
  ) {
    try {
      const permission = await this.service.updatePermission(
        permissionId,
        request
      );
      return successResponse(permission);
    } catch (error) {
      throw new CommonException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete("delete/:permissionId")
  async deletePermission(@Param("permissionId") permissionId: string) {
    try {
      const permission = await this.service.deletePermission(permissionId);
      return successResponse(permission);
    } catch (error) {
      throw new CommonException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
