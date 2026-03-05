import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service.js';
import { AuthCredentialsDto } from './auth-credentials.dto.js';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: AuthCredentialsDto) {
    let user = await this.usersService.findByEmail(dto.email);
    if (user) {
      throw new ConflictException('User with this email already exists');
    }
    const passwordHash = await bcrypt.hash(dto.password, 10);
    user = await this.usersService.create({
      email: dto.email,
      passwordHash,
    });
    return this.sanitizeUser(user);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return null;
    return this.sanitizeUser(user);
  }

  signToken({ id, email }: Pick<User, 'id' | 'email'>) {
    const access_token = this.jwtService.sign({ sub: id, email });
    return { access_token };
  }

  private sanitizeUser(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }
}
