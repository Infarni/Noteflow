import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenExceptionDto {
  @ApiProperty({ examples: ['Invalid token', 'You do not have enough rights'] })
  message: any;

  @ApiProperty({ example: 'Forbidden' })
  error: string;

  @ApiProperty({ example: HttpStatus.FORBIDDEN })
  statusCode: HttpStatus;
}
