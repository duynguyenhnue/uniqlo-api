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

import { IResponse } from "src/common/interface/response.interface";
import { successResponse } from "src/common/dto/response.dto";
import { AuthJwtAccessProtected } from "src/common/guards/role.guard";
import { AUTH_PERMISSIONS } from "src/enums/auth.enum";
import { ContactService } from "./contact.service";
import { CreateContactRequest, SearchContactRequest, UpdateContactRequest } from "src/payload/request/contact.request";
import { ContactRespone } from "src/payload/response/contact.respone";
  @Controller("contact")
  export class ContactController{
    constructor(private readonly service:ContactService){}

    @Post()
    @AuthJwtAccessProtected(AUTH_PERMISSIONS.CONTACT_CREATE)
    async create(
        @Body() contactcreaterequest: CreateContactRequest
      ): Promise<IResponse<ContactRespone>> { 
       try{
        const contact = await this.service.create(contactcreaterequest);
        return successResponse(contact);
       }catch(error)
       {
        throw new Error(`Error while create contact`);
       }
      }
      @Get('search')
      @AuthJwtAccessProtected(AUTH_PERMISSIONS.CONTACT_VIEW)
  async search(@Query() query:SearchContactRequest){
    try{
      return this.service.searchcontact(query);

    }catch(error)
    {
      throw new Error(`Error while search contact`);

    }
  }  
  @Get()
  @AuthJwtAccessProtected(AUTH_PERMISSIONS.CONTACT_VIEW)
  async findAll(): Promise<ContactRespone[]> {
    try
    {
      return this.service.findAll();
    }catch(error)
    {
      throw new Error(` Eror while find all contact `)

    }
  }
  @Get(':id')
  @AuthJwtAccessProtected(AUTH_PERMISSIONS.CONTACT_VIEW)
  async findOne(@Param('id') id: string): Promise<ContactRespone> {
    try{
      return this.service.findOne(id);
    }catch(error)
    {
      throw new Error(`Error while find  contact by id`);
    }
  }
  @Put(':id')
  @AuthJwtAccessProtected(AUTH_PERMISSIONS.CONTACT_UPDATE)
  async update(
    @Param('id')id:string,
    @Body() contactUpdateRequest:UpdateContactRequest
  ):Promise<ContactRespone>{
   try{
    return this.service.update(id,contactUpdateRequest);
   }catch(error)
   {
    throw new Error(`Error while update contact`)

   }
  }
  @Delete(':id')
  @AuthJwtAccessProtected(AUTH_PERMISSIONS.CONTACT_DELETE)
  async delete(@Param('id') id:string):Promise<{message:string}>{
    try{
      await this.service.delete(id);
    return {message:`Delete Successfully`};
    }catch(error){
      throw new Error(`Error while delete contact`)

    }
  }
  }