import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateWarehouseRequest, SearchWarehouseRequest, UpdateWarehouseRequest } from "src/payload/request/warehouse.request";
import { WarehouseResponse } from "src/payload/response/warehouse.respone";
import { Warehouse } from "src/schema/warehouse.shema";

@Injectable()
export class WarehouseService{
    constructor(@InjectModel(Warehouse.name)private readonly WarehouseModel:Model<Warehouse>){}

    async create (createWarehouseRequest:CreateWarehouseRequest):Promise<WarehouseResponse>
    {
        try{
            const warehouse=await this.createwarehouseindb(createWarehouseRequest);
            return this.mapWarehouseToResponse(warehouse);
        }catch(error){
            throw error;
        }
    }
    
    private async createwarehouseindb(createWarehouseRequest:CreateWarehouseRequest):Promise<Warehouse>{
        console.log("kq>>",createWarehouseRequest);
        return this.WarehouseModel.create(createWarehouseRequest);
    
    }
    
    async search(query:SearchWarehouseRequest):Promise<{data:WarehouseResponse[];total:number}>
    {
        const {limit=6,page=0,name,code}=query;
        const offset=(page)*limit;
        const filter: any = {};
    if(name)
    {
        const value=String(name).trim();
        filter.name={ $regex: value, $options: "i"};
    }
    if(code)
        {
            const value=String(code).trim();
            filter.code={ $regex: value, $options: "i"};
        }
    console.log("filter",filter)
    const data = await this.WarehouseModel
          .find(filter)
          .sort({ createdAt: -1 })
          .skip(offset)
          .limit(limit)
          .exec();
          const total=await this.WarehouseModel.countDocuments(filter).exec();
          return{
            data:data.map(this.mapWarehouseToResponse),
          total,
          };
    }
    
    async findAll(): Promise<WarehouseResponse[]> {
        const warehouse = await this.WarehouseModel.find().exec();
        return warehouse.map(warehouses => this.mapWarehouseToResponse(warehouses));
      }

      async findOne(id:string):Promise<WarehouseResponse>{
        const check=await this.WarehouseModel.findById(id).exec();
        if(!check)
        {
            throw new NotFoundException(`Category with Id ${id} not found`);
        }
        return this.mapWarehouseToResponse(check);
    }

    async update(id:string,updateWarehouseRequest:UpdateWarehouseRequest):Promise<WarehouseResponse>{
        console.log("ID:", id);
        const update=await this.WarehouseModel.findByIdAndUpdate(id,updateWarehouseRequest,{new:true,}).exec();
        if (!update) {
            throw new NotFoundException(`Category with ID not found`);   
        }
        return this.mapWarehouseToResponse(update);
    }

    async delete(id:string):Promise<void>{
        const kq=await this.WarehouseModel.findByIdAndDelete(id).exec();
    if(!kq)
    {
        throw new NotFoundException(`Category with ID not found`);
    }
    }
    
private mapWarehouseToResponse(warehouse: Warehouse): WarehouseResponse {
    return {
        id: warehouse._id.toString(),
        name: warehouse.name,
        code: warehouse.code,
        address: warehouse.address,
        staff: warehouse.staff,
        isActive: warehouse.isActive,
    };
}
}