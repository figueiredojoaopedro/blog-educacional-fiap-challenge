import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/users.schema';
import { UsersRepository } from '../users.repository';
import { IUser } from '../../schemas/models/users.interface';

@Injectable()
export class UsersMongooseRepository implements UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<IUser | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<IUser | null> {
    return this.userModel.findById(id).exec();
  }

  async create(user: IUser): Promise<IUser> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
}
