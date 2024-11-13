import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConflictExceptionDto } from 'src/common/dto/conflict-exception.dto';
import { BadRequestExceptionDto } from 'src/common/dto/bad-request-exception.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: ReadUserDto })
  @ApiConflictResponse({ type: ConflictExceptionDto })
  @ApiBadRequestResponse({ type: BadRequestExceptionDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<ReadUserDto> {
    return await this.userService.create(createUserDto);
  }
}
