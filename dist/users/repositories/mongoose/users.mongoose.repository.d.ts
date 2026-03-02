import { Model } from 'mongoose';
import { UserDocument } from '../../schemas/users.schema';
import { UsersRepository } from '../users.repository';
import { IUser } from '../../schemas/models/users.interface';
export declare class UsersMongooseRepository implements UsersRepository {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findByEmail(email: string): Promise<IUser | null>;
    findById(id: string): Promise<IUser | null>;
    create(user: IUser): Promise<IUser>;
}
