import { IUser } from '../schemas/models/users.interface';

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<IUser | null>;
  abstract findById(id: string): Promise<IUser | null>;
  abstract create(user: IUser): Promise<IUser>;
}
