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
import {
  CreateCategoryRequest,
  SearchCategorybyNameRequest,
  UpdateCategoryRequest,
} from "src/payload/request/categories.request";
import { successResponse } from "src/common/dto/response.dto";
import { IResponse } from "src/common/interface/response.interface";
import { CategoryResponse } from "src/payload/response/categories.respone";
import { AuthJwtAccessProtected } from "src/common/guards/role.guard";
import { AUTH_PERMISSIONS } from "src/enums/auth.enum";
import { SkipAuth } from "src/config/skip.auth";

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @AuthJwtAccessProtected(AUTH_PERMISSIONS.CATEGORY_CREATE)
  async create(
    @Body() createCategoryRequest: CreateCategoryRequest
  ): Promise<IResponse<CategoryResponse>> {
    try {
      const category = await this.categoryService.create(createCategoryRequest);
      return successResponse(category);
    } catch (error) {
      throw new NotFoundException(`Error while create category`);
    }
  }
  // 
  @Get('search')
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.CATEGORY_VIEW)
  @SkipAuth()
  async search(@Query() query: SearchCategorybyNameRequest) {
    try {
      return this.categoryService.searchCategory(query);
    } catch (error) {
      throw new NotFoundException(`Error while search category`)
    }
  }

  @Get()
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.CATEGORY_VIEW)
  @SkipAuth()
  async findAll(): Promise<CategoryResponse[]> {
    try {
      return this.categoryService.findAll();
    } catch (error) {
      throw new NotFoundException(`Error while get all category`);
    }
  }
  @Get(':id')
  @SkipAuth()
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.CATEGORY_VIEW)
  async findOne(@Param('id') id: string): Promise<CategoryResponse> {
    try {
      return this.categoryService.findOne(id);
    } catch (error) {
      throw new NotFoundException(`Error while get category by id`);
    }
  }

  @Put(':id')
  @AuthJwtAccessProtected(AUTH_PERMISSIONS.CATEGORY_UPDATE)
  async update(
    @Param('id') id: string,
    @Body() updateCategoryRequest: UpdateCategoryRequest
  ): Promise<CategoryResponse> {
    try {
      return this.categoryService.update(id, updateCategoryRequest);

    } catch (error) {
      throw new NotFoundException(`Error while update category`);
    }
  }

  @Delete(':id')
  @AuthJwtAccessProtected(AUTH_PERMISSIONS.CATEGORY_DELETE)
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.categoryService.delete(id);
      return { message: `Delete Successfully` };
    } catch (error) {
      throw new NotFoundException(`Error while delete category`);
    }
  }
}
