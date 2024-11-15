import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCategoryRequest } from "src/payload/request/categories.request";
import { CreateInventoryRequest, SearchInventoryRequest, UpdateInventoryRequest } from "src/payload/request/inventories.request";
import { InventoryResponse } from "src/payload/response/inventories.respone";
import { Inventory } from "src/schema/inventories.schema";

@Injectable()
export class InventoriesService{
    constructor(@InjectModel(Inventory.name)private readonly InventoriesModel:Model<Inventory>){}

    async create(createInventoryRequest:CreateInventoryRequest):Promise<InventoryResponse>{
        try{
            const inventory=await this.createInventoriesindb(createInventoryRequest);
            return this.mapInventoryToResponse(inventory);
        }catch(error){
            throw error;
        }        
    } 
    
    private async createInventoriesindb(createInventoryRequest:CreateInventoryRequest):Promise<Inventory>{
        console.log("kq>>",createInventoryRequest);
        return this.InventoriesModel.create(createInventoryRequest);
    
    }

    async search(query:SearchInventoryRequest):Promise<{data:InventoryResponse[];total:number}>
    {
        const {limit=6,page=0,productId,warehouseLocation}=query;
        const offset=(page-1)*limit;
        const filter: any = {};
    if(productId)
    {
        const value=String(productId).trim();
        filter.productId={ $regex: value, $options: "i"};
    }
    if(warehouseLocation)
        {
            const value=String(warehouseLocation).trim();
            filter.warehouseLocation={ $regex: value, $options: "i"};
        }
    console.log("filter",filter)
    const data = await this.InventoriesModel
          .find(filter)
          .sort({ createdAt: -1 })
          .skip(offset)
          .limit(limit)
          .exec();
          const total=await this.InventoriesModel.countDocuments(filter).exec();
          return{
            data:data.map(this.mapInventoryToResponse),
          total,
          };
    }
    
    async findAll(): Promise<InventoryResponse[]> {
        const inventory = await this.InventoriesModel.find().exec();
        return inventory.map(inventories => this.mapInventoryToResponse(inventories));
      }

      async findOne(id:string):Promise<InventoryResponse>{
        const check=await this.InventoriesModel.findById(id).exec();
        if(!check)
        {
            throw new NotFoundException(`Category with Id ${id} not found`);
        }
        return this.mapInventoryToResponse(check);
    }

    async update(id:string,updateInventoryRequest:UpdateInventoryRequest):Promise<InventoryResponse>{
        console.log("ID:", id);
        const update=await this.InventoriesModel.findByIdAndUpdate(id,updateInventoryRequest,{new:true,}).exec();
        if (!update) {
            throw new NotFoundException(`Category with ID not found`);   
        }
        return this.mapInventoryToResponse(update);
    }

    async delete(id:string):Promise<void>{
        const kq=await this.InventoriesModel.findByIdAndDelete(id).exec();
    if(!kq)
    {
        throw new NotFoundException(`Category with ID not found`);
    }
    }

    private mapInventoryToResponse(inventory: Inventory): InventoryResponse {
        return {
            id: inventory._id.toString(),
            productId: inventory.productId,
            variantSku: inventory.variantSku,
            quantity: inventory.quantity,
            reservedQuantity: inventory.reservedQuantity,
            lowStockThreshold: inventory.lowStockThreshold,
            warehouseLocation: inventory.warehouseLocation,
            color: inventory.color,
            size: inventory.size,
            status: inventory.status,
            history: inventory.history,
        };
}
}