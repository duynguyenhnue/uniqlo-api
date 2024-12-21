import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  CreateContactRequest,
  SearchContactRequest,
  UpdateContactRequest,
} from "../../payload/request/contact.request";
import { ContactRespone } from "../../payload/response/contact.respone";
import { Contact } from "../../schema/contact.schema";

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private readonly contactModel: Model<Contact>
  ) {}
  async create(create: CreateContactRequest): Promise<ContactRespone> {
    try {
      const contact = await this.createcontactindb(create);
      return this.mapcontactToResponse(contact);
    } catch (error) {
      throw error;
    }
  }
  private async createcontactindb(
    create: CreateContactRequest
  ): Promise<Contact> {
    try {
      return this.contactModel.create(create);
    } catch (error) {
      throw new Error(`Error while create contact in database`);
    }
  }
  async searchcontact(
    query: SearchContactRequest
  ): Promise<{ data: ContactRespone[]; total: number }> {
    try {
      const { limit = 6, page = 0, Message } = query;
      const offset = page * limit;
      const filter: any = {};
      if (Message) {
        const value = String(Message).trim();
        filter.Message = { $regex: value, $options: "i" };
      }

      console.log("filter", filter);
      const data = await this.contactModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .exec();
      const total = await this.contactModel.countDocuments(filter).exec();
      return {
        data: data.map(this.mapcontactToResponse),
        total,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ContactRespone[]> {
    try {
      const contact = await this.contactModel.find().exec();
      return contact.map((contacts) => this.mapcontactToResponse(contacts));
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<ContactRespone> {
    try {
      const check = await this.contactModel.findById(id).exec();
      if (!check) {
        throw new NotFoundException(`Contact with Id ${id} not found`);
      }
      return this.mapcontactToResponse(check);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updatecontact: UpdateContactRequest
  ): Promise<ContactRespone> {
    try {
      const update = await this.contactModel
        .findByIdAndUpdate(id, updatecontact, { new: true })
        .exec();
      if (!update) {
        throw new NotFoundException(`Contact with ID not found`);
      }
      return this.mapcontactToResponse(update);
    } catch (error) {
      throw new Error(`Error while update contact`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const kq = await this.contactModel.findByIdAndDelete(id).exec();
      if (!kq) {
        throw new NotFoundException(`Contact with ID not found`);
      }
    } catch (error) {
      throw new Error(`Error while delete contact`);
    }
  }

  private mapcontactToResponse(contact: Contact): ContactRespone {
    return {
      id: contact._id.toString(),
      Name: contact.Name,
      Email: contact.Email,
      Message: contact.Message,
    };
  }
}
