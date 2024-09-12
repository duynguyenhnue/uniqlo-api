import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { PhotoService } from "./photo.service";
import { Photo } from "src/schema/photo.schema";
import {
  CreatePhotoRequest,
  UpdatePhotoRequest,
} from "src/payload/request/photo.request";

@Controller("photos")
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  async uploadPhoto(
    @Body() createPhotoRequest: CreatePhotoRequest
  ): Promise<Photo> {
    return this.photoService.uploadPhoto(createPhotoRequest);
  }

  @Get(":id")
  async getPhoto(@Param("id") id: string): Promise<Photo> {
    return this.photoService.findPhotoById(id);
  }

  @Put(":id")
  async updatePhoto(
    @Param("id") id: string,
    @Body() updatePhotoRequest: UpdatePhotoRequest
  ): Promise<Photo> {
    return this.photoService.updatePhoto(id, updatePhotoRequest);
  }

  @Delete(":id")
  async deletePhoto(@Param("id") id: string): Promise<void> {
    return this.photoService.deletePhoto(id);
  }

  @Get("trip/:tripId")
  async getPhotosByTrip(@Param("tripId") tripId: string): Promise<Photo[]> {
    return this.photoService.findPhotosByTrip(tripId);
  }
}
