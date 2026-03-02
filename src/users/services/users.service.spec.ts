import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from '../repositories/users.repository';
import { IUser } from '../schemas/models/users.interface';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  const mockUser: IUser = {
    email: 'test@example.com',
    name: 'Test User',
    role: 'professor',
  };

  const mockUsersRepository = {
    findByEmail: jest.fn((email: string) =>
      Promise.resolve(email === mockUser.email ? mockUser : null),
    ),
    findById: jest.fn((id: string) =>
      Promise.resolve(id === '1' ? mockUser : null),
    ),
    create: jest.fn((user: IUser) =>
      Promise.resolve({ ...user, _id: '1' }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByEmail', () => {
    it('should return a user if found', async () => {
      const result = await service.findByEmail('test@example.com');
      expect(result).toEqual(mockUser);
      expect(repository.findByEmail).toHaveBeenCalledWith('test@example.com');
    });

    it('should return null if user not found', async () => {
      const result = await service.findByEmail('nonexistent@example.com');
      expect(result).toBeNull();
    });
  });

  describe('findById', () => {
    it('should return a user if found', async () => {
      const result = await service.findById('1');
      expect(result).toEqual(mockUser);
      expect(repository.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const result = await service.create(mockUser);
      expect(result).toEqual({ ...mockUser, _id: '1' });
      expect(repository.create).toHaveBeenCalledWith(mockUser);
    });
  });
});
