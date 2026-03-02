import { UsersRepository } from '../repositories/users.repository';
import { IUser } from '../schemas/models/users.interface';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    findByEmail(email: string): Promise<IUser | null>;
    findById(id: string): Promise<IUser | null>;
    create(user: IUser): Promise<IUser>;
}
