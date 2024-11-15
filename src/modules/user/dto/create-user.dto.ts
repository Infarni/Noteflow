import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import {
  USER_NAME_PATTERN,
  USER_NAME_VALIDATION_ERROR_MESSAGE,
  USER_PASSWORD_PATTERN,
  USER_PASSWORD_VALIDATION_ERROR_MESSAGE,
} from '@common/constants/user.constants';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(USER_NAME_PATTERN, { message: USER_NAME_VALIDATION_ERROR_MESSAGE })
  @ApiProperty({
    required: true,
    example: 'archdrdr',
    pattern: USER_NAME_PATTERN.source,
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'archdroider@proton.me' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(USER_PASSWORD_PATTERN, {
    message: USER_PASSWORD_VALIDATION_ERROR_MESSAGE,
  })
  @ApiProperty({
    required: true,
    example: 'Password123!',
    pattern: USER_PASSWORD_PATTERN.source,
  })
  password: string;
}
