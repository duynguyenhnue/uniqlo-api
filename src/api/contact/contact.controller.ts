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

import { IResponse } from "../../common/interface/response.interface";
import { successResponse } from "../../common/dto/response.dto";
import { AuthJwtAccessProtected } from "../../common/guards/role.guard";
import { AUTH_PERMISSIONS } from "../../enums/auth.enum";
import { ContactService } from "./contact.service";
import {
  CreateContactRequest,
  SearchContactRequest,
  UpdateContactRequest,
} from "../../payload/request/contact.request";
import { ContactRespone } from "../../payload/response/contact.respone";
import { SkipAuth } from "../../config/skip.auth";
@Controller("contact")
export class ContactController {
  constructor(private readonly service: ContactService) {}

  @Post()
  @SkipAuth()
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.CONTACT_CREATE)
  async create(
    @Body() contactcreaterequest: CreateContactRequest
  ): Promise<IResponse<ContactRespone>> {
    try {
      const contact = await this.service.create(contactcreaterequest);
      return successResponse(contact);
    } catch (error) {
      throw new Error(`Error while create contact`);
    }
  }
  @Get("search")
  @SkipAuth()
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.CONTACT_VIEW)
  async search(@Query() query: SearchContactRequest) {
    try {
      return this.service.searchcontact(query);
    } catch (error) {
      throw new Error(`Error while search contact`);
    }
  }
  @Get()
  @SkipAuth()
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.CONTACT_VIEW)
  async findAll(): Promise<ContactRespone[]> {
    try {
      return this.service.findAll();
    } catch (error) {
      throw new Error(` Eror while find all contact `);
    }
  }
  @Get(":id")
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.CONTACT_VIEW)
  @SkipAuth()
  async findOne(@Param("id") id: string): Promise<ContactRespone> {
    try {
      return this.service.findOne(id);
    } catch (error) {
      throw new Error(`Error while find  contact by id`);
    }
  }
  @Put(":id")
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.CONTACT_UPDATE)
  @SkipAuth()
  async update(
    @Param("id") id: string,
    @Body() contactUpdateRequest: UpdateContactRequest
  ): Promise<ContactRespone> {
    try {
      return this.service.update(id, contactUpdateRequest);
    } catch (error) {
      throw new Error(`Error while update contact`);
    }
  }
  @Delete(":id")
  @SkipAuth()
  // @AuthJwtAccessProtected(AUTH_PERMISSIONS.CONTACT_DELETE)
  async delete(@Param("id") id: string): Promise<{ message: string }> {
    try {
      await this.service.delete(id);
      return { message: `Delete Successfully` };
    } catch (error) {
      throw new Error(`Error while delete contact`);
    }
  }
}
