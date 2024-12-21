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
  BadRequestException,
} from "@nestjs/common";
import { IResponse } from "../../common/interface/response.interface";
import { successResponse } from "../../common/dto/response.dto";
import { AuthJwtAccessProtected } from "../../common/guards/role.guard";
import { AUTH_PERMISSIONS } from "../../enums/auth.enum";
import { BlogDetailService } from "./blogdetails.service";
import {
  CreateBlogdetailRequest,
  CreateCommemtRequest,
  SearchBlogdetailRequest,
  UpdateBlogdetailRequest,
  UpdateCommentRequest,
} from "../../payload/request/blog-details.request";
import { BlogDetailRespone } from "../../payload/response/blogdetails.respone";
import { SkipAuth } from "../../config/skip.auth";
@Controller("blog-details")
export class BlogDetailController {
  constructor(private readonly service: BlogDetailService) {}

  @Post()
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.BLOGDETAIL_CREATE)
  async create(
    @Body() blogdetailcreaterequest: CreateBlogdetailRequest
  ): Promise<IResponse<BlogDetailRespone>> {
    try {
      const blogdetail = await this.service.create(blogdetailcreaterequest);
      return successResponse(blogdetail);
    } catch (error) {
      throw new BadRequestException(
        `Error while create blogdetail ${error.message}`
      );
    }
  }

  @Get("search")
  @SkipAuth()
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.BLOGDETAIL_VIEW)
  async search(@Query() query: SearchBlogdetailRequest) {
    try {
      return this.service.searchblogdetail(query);
    } catch (error) {
      throw new BadRequestException(
        `Error while search blogdetail ${error.message}`
      );
    }
  }

  @Post(":blogId/comments")
  async addCommenttoBlog(
    @Param("blogId") blogId: string,
    @Body() create: CreateCommemtRequest
  ): Promise<BlogDetailRespone> {
    try {
      return this.service.addCommenttoBlog(blogId, create);
    } catch (error) {
      throw new BadRequestException(`error while add comment ${error.message}`);
    }
  }

  @Get()
  @SkipAuth()
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.BLOGDETAIL_VIEW)
  async findAll(): Promise<BlogDetailRespone[]> {
    try {
      return this.service.findAll();
    } catch (error) {
      throw new BadRequestException(
        ` Eror while find all blogdetail ${error.message} `
      );
    }
  }
  @Get(":id")
  @SkipAuth()
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.BLOGDETAIL_VIEW)
  async findOne(@Param("id") id: string): Promise<BlogDetailRespone> {
    try {
      return this.service.findOne(id);
    } catch (error) {
      throw new BadRequestException(
        `Error while find  blogdetail by id ${error.message}`
      );
    }
  }
  @Put(":id")
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.BLOGDETAIL_UPDATE)
  async update(
    @Param("id") id: string,
    @Body() blogdetailUpdateRequest: UpdateBlogdetailRequest
  ): Promise<BlogDetailRespone> {
    try {
      return this.service.update(id, blogdetailUpdateRequest);
    } catch (error) {
      throw new BadRequestException(
        `Error while update blogdetail ${error.message}`
      );
    }
  }

  @Put(":blogId/comments/:commentId")
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.BLOGDETAIL_UPDATE)
  async updatecomment(
    @Param("blogId") blogId: string,
    @Param("commentId") commentId: string,
    @Body() updatecmt: UpdateCommentRequest
  ): Promise<BlogDetailRespone> {
    try {
      return this.service.updateComment(blogId, commentId, updatecmt);
    } catch (error) {
      throw new BadRequestException(
        `Error while update comment blogdetail ${error.message}`
      );
    }
  }

  @Delete(":id")
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.BLOGDETAIL_DELETE)
  async delete(@Param("id") id: string): Promise<{ message: string }> {
    try {
      await this.service.delete(id);
      return { message: `Delete Successfully` };
    } catch (error) {
      throw new BadRequestException(
        `Error while delete blogdetail ${error.message}`
      );
    }
  }

  @Delete(":blogId/comments/:commentId")
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.BLOGDETAIL_DELETE)
  async removeComment(
    @Param("blogId") blogId: string,
    @Param("commentId") commentId: string
  ) {
    try {
      return this.service.removeCommentFromBlog(blogId, commentId);
    } catch (error) {
      throw new BadRequestException(
        `Error while delete comment blogdetail ${error.message}`
      );
    }
  }
}
