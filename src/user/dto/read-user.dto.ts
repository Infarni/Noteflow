import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReadUserDto {
  @ApiProperty({ example: 'cm3fs2g4j00002067f3pu07fj' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'archdrdr' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'archdroider@proton.me' })
  @Expose()
  email: string;

  @ApiProperty({ example: '2024-11-11T03:15:123+00:03' })
  @Expose()
  updatedAt: Date;

  @ApiProperty({ example: '2024-11-11T03:15:123+00:03' })
  @Expose()
  createdAt: Date;
}
