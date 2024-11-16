import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Put,
  Delete,
  Query,
  NotFoundException,
} from "@nestjs/common";
import { CategoryService } from "./categories.service";
import { CreateCategoryRequest, SearchCategorybyNameRequest, UpdateCategoryRequest } from "src/payload/request/categories.request";
import { successResponse } from "src/common/dto/response.dto";
import { IResponse } from "src/common/interface/response.interface"; 
import { CategoryResponse } from "src/payload/response/categories.respone";

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createCategoryRequest: CreateCategoryRequest
  ): Promise<IResponse<CategoryResponse>> { 
    const category = await this.categoryService.create(createCategoryRequest);
    return successResponse(category); 
  }
  // 
  @Get('search')
  async search(@Query()query:SearchCategorybyNameRequest){
    return this.categoryService.searchCategory(query);
  }
 
  @Get()
  async findAll(): Promise<CategoryResponse[]> {
    return this.categoryService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryResponse> {
    return this.categoryService.findOne(id);
  }
  @Put(':id')
  async update(
    @Param('id')id:string,
    @Body() updateCategoryRequest:UpdateCategoryRequest
  ):Promise<CategoryResponse>{
    return this.categoryService.update(id,updateCategoryRequest);
  }
  @Delete(':id')
  async delete(@Param('id')id:string):Promise<{message:string}>{
    await this.categoryService.delete(id);
    return {message:`Delete Successfully`};
  }
}
