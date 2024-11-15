import {
  USER_PASSWORD_PATTERN,
  USER_PASSWORD_VALIDATION_ERROR_MESSAGE,
} from '@common/constants/user.constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    examples: ['archdrdr', 'archdroider@proton.me'],
  })
  login: string;

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
