import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    register: jest.fn((dto: RegisterDto) =>
      Promise.resolve({ email: dto.email, name: dto.name, role: 'professor' }),
    ),
    login: jest.fn((dto: LoginDto) =>
      Promise.resolve({
        access_token: 'mockToken',
        user: { email: dto.email, name: 'Test', role: 'professor', _id: '1' },
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a user', async () => {
      const dto: RegisterDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test',
      };
      const result = await controller.register(dto);
      expect(result).toEqual({ email: dto.email, name: dto.name, role: 'professor' });
      expect(service.register).toHaveBeenCalledWith(dto);
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const dto: LoginDto = { email: 'test@example.com', password: 'password' };
      const result = await controller.login(dto);
      expect(result).toEqual({
        access_token: 'mockToken',
        user: { email: dto.email, name: 'Test', role: 'professor', _id: '1' },
      });
      expect(service.login).toHaveBeenCalledWith(dto);
    });
  });
});
