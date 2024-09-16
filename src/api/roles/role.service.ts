import { Injectable } from "@nestjs/common";
import { CreateAndUpdateRoleRequest } from "src/payload/request/role.request";
import { GetListRoleResponse } from "src/payload/response/role.response";
import { RoleRepository } from "src/repositories/role.repository";
import { RoleDocument } from "src/schema/role.schema";

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async createRole(request: CreateAndUpdateRoleRequest): Promise<RoleDocument> {
    const roleToSave = { ...request };
    console.log(roleToSave);

    return await this.roleRepository.create(roleToSave);
  }

  async getListRoles(
    page: number,
    limit: number
  ): Promise<GetListRoleResponse> {
    const offset = (page - 1) * limit;
    const { data: roles, total } = await this.roleRepository.getListRoles(
      offset,
      limit
    );
    return {
      data: roles,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getRoleDetail(roleId: string): Promise<RoleDocument> {
    return this.roleRepository.findById(roleId);
  }

  async updateRole(
    roleId: string,
    request: CreateAndUpdateRoleRequest
  ): Promise<RoleDocument> {
    return this.roleRepository.update(roleId, request);
  }

  async deleteRole(roleId: string): Promise<string> {
    await this.roleRepository.softDelete(roleId);
    return "Role Deleted";
  }
}
