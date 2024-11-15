import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '@modules/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from '@modules/auth/auth.module';
import { JwtAccessAuthGuard } from '@modules/auth/guards/jwt-access-auth.guard';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    JwtAccessAuthGuard,
    JwtService,
    ConfigService,
  ],
  exports: [UserService],
})
export class UserModule {}
