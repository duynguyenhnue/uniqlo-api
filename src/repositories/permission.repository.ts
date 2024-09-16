import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Permission, PermissionDocument } from "src/schema/permission.schema";

@Injectable()
export class PermissionRepository {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<Permission>
  ) {}

  async create(permissionDocument: Partial<PermissionDocument>) {
    const permission = new this.permissionModel(permissionDocument);
    return await permission.save();
  }

  async getListPermissions(
    offset: number,
    limit: number
  ): Promise<{ data: PermissionDocument[]; total: number }> {
    const data = await this.permissionModel
      .find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
    const total = await this.permissionModel
      .countDocuments({ isDeleted: false })
      .exec();
    return { data, total };
  }

  async findById(id: string): Promise<PermissionDocument> {
    const objectId = new Types.ObjectId(id);
    return this.permissionModel.findById(objectId).exec();
  }

  async findByPermissionId(
    permissionId: string
  ): Promise<PermissionDocument | null> {
    return this.permissionModel.findOne({ permissionId }).exec();
  }

  async update(
    permissionId: string,
    permissionDocument: Partial<PermissionDocument>
  ): Promise<PermissionDocument | null> {
    return this.permissionModel
      .findByIdAndUpdate(permissionId, permissionDocument, {
        new: true,
      })
      .exec();
  }

  async softDelete(permissionId: string): Promise<void> {
    await this.permissionModel.findByIdAndUpdate(permissionId, {
      isDeleted: true,
    });
  }

  async findByCodes(codes: string[]): Promise<PermissionDocument[]> {
    return this.permissionModel.find({ code: { $in: codes } }).exec();
  }
}
