import { AuthModule } from '@modules/auth/auth.module';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
