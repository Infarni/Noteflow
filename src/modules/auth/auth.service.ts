import { UserService } from '@modules/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { User } from '@prisma/client';
import { verifyHash } from '@common/utils/verifyHash.util';
import { JwtService } from '@nestjs/jwt';
import { TokensDto } from './dto/tokens.dto';
import { PayloadDto } from './dto/payload.dto';
import {
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
} from '@common/constants/auth.constants';
import { ConfigService } from '@nestjs/config';
import { TokenEnum } from './enums/token.enum';
import { ReadUserDto } from '@modules/user/dto/read-user.dto';

@Injectable()
export class AuthService {
  private readonly saltRounds: number = 10;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<TokensDto> {
    const user: User | null = await this.userService.getByLogin(
      signInDto.login,
    );
    if (user == null) {
      throw new UnauthorizedException('Invalid login');
    }

    const isValidPassword: boolean = await verifyHash(
      signInDto.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload: Omit<PayloadDto, 'type'> = { sub: user.id, name: user.name };

    const schema: TokensDto = {
      accessToken: await this.jwtService.signAsync(
        {
          type: TokenEnum.ACCESS,
          ...payload,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET_KEY'),
          expiresIn: ACCESS_TOKEN_EXPIRES,
        },
      ),
      refreshToken: await this.jwtService.signAsync(
        {
          type: TokenEnum.REFRESH,
          ...payload,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET_KEY'),
          expiresIn: REFRESH_TOKEN_EXPIRES,
        },
      ),
    };

    return schema;
  }

  async refresh(id: string, refreshToken: string): Promise<TokensDto> {
    const user: ReadUserDto = await this.userService.getById(id);

    const payload: Omit<PayloadDto, 'type'> = { sub: user.id, name: user.name };

    const schema: TokensDto = {
      accessToken: await this.jwtService.signAsync(
        {
          type: TokenEnum.ACCESS,
          ...payload,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET_KEY'),
          expiresIn: ACCESS_TOKEN_EXPIRES,
        },
      ),
      refreshToken: refreshToken,
    };

    return schema;
  }
}
