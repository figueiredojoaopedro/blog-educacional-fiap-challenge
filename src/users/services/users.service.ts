import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { IUser } from '../schemas/models/users.interface';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findByEmail(email: string): Promise<IUser | null> {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: string): Promise<IUser | null> {
    return this.usersRepository.findById(id);
  }

  async create(user: IUser): Promise<IUser> {
    return this.usersRepository.create(user);
  }
}
