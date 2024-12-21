import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "../../schema/categories.schema";
import {
  CreateCategoryRequest,
  SearchCategorybyNameRequest,
  UpdateCategoryRequest,
} from "../../payload/request/categories.request";
import {
  CategoryResponse,
  CategoryResponseWithProducts,
  ProductInCategory,
} from "../../payload/response/categories.respone";
import { Product } from "../../schema/product.schema";
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly CategoryModel: Model<Category>,
    @InjectModel(Product.name) private readonly ProductModel: Model<Product>
  ) {}
  async create(
    createCategoryRequest: CreateCategoryRequest
  ): Promise<CategoryResponse> {
    try {
      const category = await this.CategoryModel.create(createCategoryRequest);
      return this.mapCategoryToResponse(category);
    } catch (error) {
      throw error;
    }
  }
  // async searchbyName(name:string):Promise<CategoryResponse[]>{
  //     const kq=await this.CategoryModel.find({name:{$regex:name,$options:'i'}}).exec();
  //     if(!kq||kq.length===0)
  //     {
  //         throw new NotFoundException(`Not found by name:${name}`)
  //     }
  //     return kq.map(this.mapCategoryToResponse)
  // }
  async searchCategory(
    query: SearchCategorybyNameRequest
  ): Promise<{ data: CategoryResponse[]; total: number }> {
    try {
      const { limit = 6, page = 0, name } = query;
      const offset = page * limit;
      const filter: any = {};
      if (name) {
        const value = String(name).trim();
        filter.name = { $regex: value, $options: "i" };
      }
      const data = await this.CategoryModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .exec();
      const total = await this.CategoryModel.countDocuments(filter).exec();
      return {
        data: data.map(this.mapCategoryToResponse),
        total,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<CategoryResponse[]> {
    try {
      const categories = await this.CategoryModel.find().exec();
      return categories.map((category) => this.mapCategoryToResponse(category));
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<CategoryResponseWithProducts> {
    try {
      const check = await this.CategoryModel.findById(id).exec();
      if (!check) {
        throw new NotFoundException(`Category with Id ${id} not found`);
      }

      // Lấy các trường cần thiết từ sản phẩm
      const products = await this.ProductModel.find({ categoryId: id })
        .select("_id Product_name Product_price Product_images") // Chỉ lấy các trường cần thiết
        .exec();

      // Map chỉ lấy Product_images[0] cho mỗi sản phẩm
      const formattedProducts = products.map((product) => ({
        id: product._id,
        name: product.Product_name,
        price: product.Product_price,
        image: product.Product_images?.[0] || null, // Lấy ảnh đầu tiên hoặc null
      }));

      return {
        ...this.mapCategoryToResponse(check),
        products: formattedProducts as ProductInCategory[],
      };
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateCategoryRequest: UpdateCategoryRequest
  ): Promise<CategoryResponse> {
    try {
      const update = await this.CategoryModel.findByIdAndUpdate(
        id,
        updateCategoryRequest,
        { new: true }
      ).exec();
      if (!update) {
        throw new NotFoundException(`Category with ID not found`);
      }
      return this.mapCategoryToResponse(update);
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<void> {
    try {
      const kq = await this.CategoryModel.findByIdAndDelete(id).exec();
      if (!kq) {
        throw new NotFoundException(`Category with ID not found`);
      }
    } catch (error) {
      throw error;
    }
  }

  private mapCategoryToResponse(category: Category): CategoryResponse {
    return {
      id: category._id.toString(),
      name: category.name,
      image: category.image,
      order: category.order,
      featured: category.featured,
      material: category.material,
      status: category.status,
    };
  }
}
