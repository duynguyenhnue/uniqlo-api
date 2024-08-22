import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserRequest, UpdateUserRequest } from 'src/payload/request/users.request';
import { User } from 'src/payload/schema/user.schema';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createUserRequest: CreateUserRequest): Promise<User> {

    const isUser = await this.findByEmail(createUserRequest.email);
    if (isUser) throw new ConflictException('User Already Exists');
    
    const hash: string = await bcrypt.hash(
      createUserRequest.password,
      10,
    );
    createUserRequest.password = hash;
    const newUser = this.userModel.create(createUserRequest);

    return newUser;
  }

  async update(userId: string, updateUserRequest: UpdateUserRequest): Promise<User> {

    const isUser = await this.userModel.findById(userId);
    if (isUser) throw new ConflictException('User Already Exists');

    const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateUserRequest, { new: true });

    return updatedUser;
  }

  async findByUserId(userId: string): Promise<User> {
    const user = await this.userModel.findOne({userId: userId}).exec();
    if (!user) {
      throw new NotFoundException(`User with userId ${userId} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({email: email}).exec();;
    console.log(user);
    
    return user;
  }

  async delete(userId: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(userId);
    if (!result) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
  }

}
