import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const match = await bcrypt.compare(pass, user.passwordHash);
    if (!match) return null;

    // Devuelve el documento completo con _id incluido
    return user;
  }

  async login(user: any) {
    const payload = {
      sub: user._id?.toString?.() ?? user.id, // usa el ID como "sub"
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: RegisterDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);

    const createUserDto: CreateUserDto = {
      role: 'client',
      name: dto.name,
      email: dto.email,
      passwordHash: hash,
    };

    const newUser = await this.usersService.create(createUserDto);

    // Devuelve el objeto sin el hash
    const { passwordHash, ...result } = newUser.toObject();
    return result;
  }
}
