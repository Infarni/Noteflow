import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BadRequestExceptionDto {
  @ApiProperty({
    example: [
      'Name must be between 3 and 20 characters and contain only letters and numbers',
      'name should not be empty',
    ],
  })
  message: string[];

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: HttpStatus;
}
