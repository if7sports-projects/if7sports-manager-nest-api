// src/auth/auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService }          from '@nestjs/jwt';
import { AuthService }         from './auth.service';
import { UsersService }        from '../users/users.service';
import * as bcrypt             from 'bcrypt';

const mockUsersService = {
  findByEmail: jest.fn().mockResolvedValue({ email:'a', passwordHash: bcrypt.hashSync('pwd',10), role:'client', _id:'1' }),
  create: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('jwt-token'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // …tests de login y register…
});
