import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ConflictExceptionDto {
  @ApiProperty({ example: 'Record with field=value already exists' })
  message: any;

  @ApiProperty({ example: 'Conflict' })
  error: string;

  @ApiProperty({ example: HttpStatus.CONFLICT })
  statusCode: HttpStatus;
}
