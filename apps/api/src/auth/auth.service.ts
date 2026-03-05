import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { createHash, randomBytes } from 'node:crypto';
import type { StringValue } from 'ms';
import ms from 'ms';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsersService } from '../users/users.service.js';
import { AuthCredentialsDto } from './dto/auth-credentials.dto.js';

const REFRESH_EXPIRES_IN = (process.env.REFRESH_TOKEN_EXPIRES_IN ??
  '7d') as StringValue;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async register(dto: AuthCredentialsDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({
      email: dto.email,
      passwordHash,
    });
    const sanitized = this.sanitizeUser(user);
    const tokens = await this.issueTokens(sanitized);
    return { user: sanitized, ...tokens };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return null;
    return this.sanitizeUser(user);
  }

  /** Выдаёт пару access + refresh, сохраняет refresh в БД. */
  async issueTokens(user: { id: string; email: string }) {
    const access_token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
    const refresh_token = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256').update(refresh_token).digest('hex');
    const refreshMs = ms(REFRESH_EXPIRES_IN);
    const expiresAt = new Date(Date.now() + refreshMs);
    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });
    return {
      access_token,
      refresh_token,
      expires_in: refreshMs,
    };
  }

  /** Обмен refresh_token на новую пару access + refresh (ротация). */
  async refresh(refresh_token: string) {
    const tokenHash = createHash('sha256').update(refresh_token).digest('hex');
    const record = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });
    if (!record || record.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    await this.prisma.refreshToken.delete({ where: { id: record.id } });
    const user = this.sanitizeUser(record.user);
    return this.issueTokens(user);
  }

  /** Инвалидация refresh_token (логаут с устройства). */
  async logout(refresh_token: string) {
    const tokenHash = createHash('sha256').update(refresh_token).digest('hex');
    await this.prisma.refreshToken.deleteMany({ where: { tokenHash } });
  }

  private sanitizeUser(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }
}
