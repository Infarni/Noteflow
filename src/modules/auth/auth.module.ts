import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '@modules/user/user.service';
import { PrismaService } from '@modules/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessAuthGuard } from './guards/jwt-access-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    JwtService,
    ConfigService,
    JwtAccessAuthGuard,
    JwtRefreshAuthGuard,
  ],
  exports: [AuthService, JwtAccessAuthGuard],
})
export class AuthModule {}
