import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  CreatePhotoRequest,
  UpdatePhotoRequest,
} from "src/payload/request/photo.request";
import { Photo } from "src/schema/photo.schema";

@Injectable()
export class PhotoService {
  constructor(
    @InjectModel(Photo.name) private readonly photoModel: Model<Photo>
  ) {}

  async uploadPhoto(createPhotoRequest: CreatePhotoRequest): Promise<Photo> {
    const createdPhoto = new this.photoModel(createPhotoRequest);
    return createdPhoto.save();
  }

  async findPhotoById(id: string): Promise<Photo> {
    const photo = await this.photoModel.findById(id).exec();
    if (!photo) {
      throw new NotFoundException(`Photo with ID ${id} not found`);
    }
    return photo;
  }

  async updatePhoto(
    id: string,
    updatePhotoRequest: UpdatePhotoRequest
  ): Promise<Photo> {
    const photo = await this.photoModel
      .findByIdAndUpdate(id, updatePhotoRequest, { new: true })
      .exec();
    if (!photo) {
      throw new NotFoundException(`Photo with ID ${id} not found`);
    }
    return photo;
  }

  async deletePhoto(id: string): Promise<void> {
    const result = await this.photoModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Photo with ID ${id} not found`);
    }
  }

  async findPhotosByTrip(tripId: string): Promise<Photo[]> {
    return this.photoModel.find({ trip: tripId }).exec();
  }
}
