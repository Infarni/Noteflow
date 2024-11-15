import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class NotFoundExceptionDto {
  @ApiProperty({
    example: 'Record with field=value not found',
  })
  message: any;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode: HttpStatus;
}
