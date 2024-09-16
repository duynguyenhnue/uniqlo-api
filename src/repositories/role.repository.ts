import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Role, RoleDocument } from "src/schema/role.schema";

@Injectable()
export class RoleRepository {
  constructor(
    @InjectModel(Role.name)
    private roleModel: Model<Role>
  ) {}

  async create(roleDocument: Partial<RoleDocument>) {
    const role = new this.roleModel(roleDocument);
    return await role.save();
  }

  async findById(id: string): Promise<RoleDocument> {
    const objectId = new Types.ObjectId(id);
    return this.roleModel.findById(objectId).exec();
  }

  async findByRoleId(roleId: string): Promise<RoleDocument | null> {
    return this.roleModel.findOne({ roleId }).exec();
  }

  async getListRoles(
    offset: number,
    limit: number
  ): Promise<{ data: RoleDocument[]; total: number }> {
    const data = await this.roleModel
      .find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
    const total = await this.roleModel
      .countDocuments({ isDeleted: false })
      .exec();
    return { data, total };
  }

  async update(
    roleId: string,
    roleDocument: Partial<RoleDocument>
  ): Promise<RoleDocument | null> {
    return this.roleModel
      .findByIdAndUpdate(roleId, roleDocument, {
        new: true,
      })
      .exec();
  }

  async softDelete(roleId: string): Promise<void> {
    await this.roleModel.findByIdAndUpdate(roleId, {
      isDeleted: true,
    });
  }
}
