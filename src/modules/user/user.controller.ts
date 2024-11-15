import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { ConflictExceptionDto } from '@common/dto/conflict-exception.dto';
import { BadRequestExceptionDto } from '@common/dto/bad-request-exception.dto';
import { UnauthorizedExceptionDto } from '@common/dto/unauthorized-exception.dto';
import { ForbiddenExceptionDto } from '@common/dto/forbidden-exception.dto';
import { NotFoundExceptionDto } from '@common/dto/not-found-exception.dto';
import { JwtAccessAuthGuard } from '@modules/auth/guards/jwt-access-auth.guard';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: ReadUserDto })
  @ApiBadRequestResponse({ type: BadRequestExceptionDto })
  @ApiConflictResponse({ type: ConflictExceptionDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<ReadUserDto> {
    return await this.userService.create(createUserDto);
  }

  @Get('me')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOkResponse({ type: ReadUserDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedExceptionDto })
  @ApiForbiddenResponse({ type: ForbiddenExceptionDto })
  @ApiNotFoundResponse({ type: NotFoundExceptionDto })
  async getMe(@Request() req): Promise<ReadUserDto> {
    return await this.userService.getById(req.userId);
  }
}
