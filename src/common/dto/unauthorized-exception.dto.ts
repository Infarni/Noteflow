import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedExceptionDto {
  @ApiProperty({
    examples: ['Invalid login', 'Invalid password', 'Missing token'],
  })
  message: any;

  @ApiProperty({ example: 'Unauthorized' })
  error: string;

  @ApiProperty({ example: HttpStatus.UNAUTHORIZED })
  statusCode: HttpStatus;
}
