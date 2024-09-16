import { Injectable } from "@nestjs/common";
import { CreateAndUpdatePermissionRequest } from "../../payload/request/permission.request";
import { GetListPermissionResponse } from "../../payload/response/permission.response";
import { PermissionRepository } from "../../repositories/permission.repository";
import { PermissionDocument } from "../../schema/permission.schema";

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async createPermission(
    request: CreateAndUpdatePermissionRequest
  ): Promise<PermissionDocument> {
    const permissionToSave = { ...request };
    return await this.permissionRepository.create(permissionToSave);
  }

  async getListPermissions(
    page: number,
    limit: number
  ): Promise<GetListPermissionResponse> {
    const offset = (page - 1) * limit;
    const { data: permissions, total } =
      await this.permissionRepository.getListPermissions(offset, limit);
    return {
      data: permissions,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getPermissionDetail(permissionId: string): Promise<PermissionDocument> {
    return this.permissionRepository.findById(permissionId);
  }

  async updatePermission(
    permissionId: string,
    request: CreateAndUpdatePermissionRequest
  ): Promise<PermissionDocument> {
    const currentPermission = await this.permissionRepository.findById(
      permissionId
    );

    const newVersion = this.incrementVersion(currentPermission.version);
    const updatedRequest = {
      ...request,
      version: newVersion,
    };
    return this.permissionRepository.update(permissionId, updatedRequest);
  }

  async deletePermission(permissionId: string): Promise<string> {
    await this.permissionRepository.softDelete(permissionId);
    return "Permission Deleted";
  }

  private incrementVersion(currentVersion: string): string {
    const parts = currentVersion.split(".").map(Number);

    if (parts[2] < 9) {
      parts[2]++;
    } else if (parts[1] < 9) {
      parts[1]++;
      parts[2] = 0;
    } else {
      parts[0]++;
      parts[1] = 0;
      parts[2] = 0;
    }

    return parts.join(".");
  }
}
