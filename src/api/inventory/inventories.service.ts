import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateInventoryRequest, SearchInventoryRequest, UpdateInventoryRequest } from "src/payload/request/inventories.request";
import { InventoryResponse } from "src/payload/response/inventories.respone";
import { Inventory } from "src/schema/inventories.schema";
import { Product } from "src/schema/product.schema";
import { User } from "src/schema/user.schema";

@Injectable()
export class InventoriesService {
    constructor(@InjectModel(Inventory.name) private readonly InventoriesModel: Model<Inventory>,
        @InjectModel(Product.name) private readonly ProductModel: Model<Product>) { }

    async create(createInventoryRequest: CreateInventoryRequest, user: User): Promise<InventoryResponse> {
        try {
            // Tìm sản phẩm trùng productId, userId, size, và color
            const check = await this.InventoriesModel.findOne({
                productId: createInventoryRequest.productId,
                userId: user.id,
                size: createInventoryRequest.size,
                color: createInventoryRequest.color,
            }).exec();

            if (check) {
                // Nếu tìm thấy, tăng quantity
                check.quantity += createInventoryRequest.quantity;
                const updatedInventory = await check.save(); // Lưu thay đổi vào cơ sở dữ liệu
                return this.mapInventoryToResponse(updatedInventory);
            }

            // Nếu không tìm thấy, tạo mới sản phẩm
            const cart = {
                ...createInventoryRequest,
                userId: user.id,
            };
            const inventory = await this.createInventoriesindb(cart);
            return this.mapInventoryToResponse(inventory);

        } catch (error) {
            throw error; // Ném lỗi ra ngoài để xử lý
        }
    }

    private async createInventoriesindb(createInventoryRequest: CreateInventoryRequest): Promise<Inventory> {
        return this.InventoriesModel.create(createInventoryRequest);

    }

    async search(query: SearchInventoryRequest, user: User): Promise<{ data: InventoryResponse[]; total: number }> {
        const { limit = 6, page = 0, productName, warehouseLocation } = query;
        const offset = (page) * limit;
        const filter: any = {};
        if (productName) {
            const value = productName;
            filter.productName = { $regex: value, $options: "i" };
        }
        if (warehouseLocation) {
            const value = warehouseLocation;
            filter.warehouseLocation = { $regex: value, $options: "i" };
        }
        const data = await this.InventoriesModel
            .find(filter)
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .exec();

        const dataNew = data.filter(item => item.userId == user.id);

        const result = await Promise.all(dataNew.map(async (item) => {
            if (!item.productId) {
                return null;
            }
            const product = await this.ProductModel.findById(item.productId).exec();
            return {
                ...item.toObject(),
                name: product.Product_name,
                price: product.Product_price,
                image: product.Product_images[0],
                sizes: product.Product_size,
                colors: product.Product_color,
            }
        }))

        const total = dataNew.length;
        return {
            data: result as InventoryResponse[],
            total,
        };
    }

    async findAll(): Promise<InventoryResponse[]> {
        const inventory = await this.InventoriesModel.find().exec();
        return inventory.map(inventories => this.mapInventoryToResponse(inventories));
    }

    async findOne(id: string): Promise<InventoryResponse> {
        const check = await this.InventoriesModel.findById(id).exec();
        if (!check) {
            throw new NotFoundException(`Category with Id ${id} not found`);
        }
        return this.mapInventoryToResponse(check);
    }

    async update(id: string, updateInventoryRequest: UpdateInventoryRequest): Promise<InventoryResponse> {
        const update = await this.InventoriesModel.findByIdAndUpdate(id, updateInventoryRequest, { new: true, }).exec();
        if (!update) {
            throw new NotFoundException(`Category with ID not found`);
        }
        return this.mapInventoryToResponse(update);
    }

    async delete(id: string): Promise<void> {
        const kq = await this.InventoriesModel.findByIdAndDelete(id).exec();
        if (!kq) {
            throw new NotFoundException(`Cart with ID not found`);
        }
    }

    private mapInventoryToResponse(inventory: Inventory): InventoryResponse {
        return {
            id: inventory._id.toString(),
            productId: inventory.productId,
            quantity: inventory.quantity,
            color: inventory.color,
            size: inventory.size,
            userId: inventory.userId,
            createdAt: inventory.createdAt,
            updatedAt: inventory.updatedAt,
        };
    }
}