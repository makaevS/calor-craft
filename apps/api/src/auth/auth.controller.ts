/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthCredentialsDto } from './auth-credentials.dto.js';
import { LocalAuthGuard } from './guards/local-auth.guard.js';
import { User } from '@prisma/client';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: AuthCredentialsDto) {
    const user = await this.authService.register(dto);
    const token = this.authService.signToken(user);
    return { user, ...token };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req: { user: User }, @Body() _dto: AuthCredentialsDto) {
    return this.authService.signToken(req.user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: { user: User }) {
    return req.user;
  }
}
