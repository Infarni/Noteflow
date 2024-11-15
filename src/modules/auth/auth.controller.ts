import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequestExceptionDto } from '@common/dto/bad-request-exception.dto';
import { UnauthorizedExceptionDto } from '@common/dto/unauthorized-exception.dto';
import { TokensDto } from './dto/tokens.dto';
import { ForbiddenExceptionDto } from '@common/dto/forbidden-exception.dto';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ type: TokensDto })
  @ApiBadRequestResponse({ type: BadRequestExceptionDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedExceptionDto })
  async signIn(@Body() signInDto: SignInDto): Promise<TokensDto> {
    return await this.authService.signIn(signInDto);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: TokensDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedExceptionDto })
  @ApiForbiddenResponse({ type: ForbiddenExceptionDto })
  async refresh(@Request() req): Promise<TokensDto> {
    console.log(req.userId);
    return await this.authService.refresh(req.userId, req.refreshToken);
  }
}
