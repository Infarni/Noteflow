import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PayloadDto } from '../dto/payload.dto';
import { ConfigService } from '@nestjs/config';
import { TokenEnum } from '../enums/token.enum';

@Injectable()
export class JwtAccessAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token: string = this.extractTokenFromHeader(request);

    try {
      const payload: PayloadDto = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      });

      if (payload.type != TokenEnum.ACCESS) {
        throw new ForbiddenException('Invalid token');
      }

      request['userId'] = payload.sub;
    } catch {
      throw new ForbiddenException('Invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type != 'Bearer') {
      throw new UnauthorizedException('Missing token');
    }

    return token;
  }
}
