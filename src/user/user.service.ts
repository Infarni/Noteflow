import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ReadUserDto } from './dto/read-user.dto';
import { mapInstance } from 'src/common/utils/map-instance.util';
import { hashValue } from 'src/common/utils/hashValue.util';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<ReadUserDto> {
    await this.checkUniqueValues(createUserDto);

    const hashedPassword: string = await hashValue(createUserDto.password);

    const user: User = await this.prismaService.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });

    const schema = mapInstance(ReadUserDto, user);

    return schema;
  }

  async getByLogin(login: string): Promise<User | null> {
    const user: User | null = await this.prismaService.user.findFirst({
      where: { OR: [{ name: login }, { email: login }] },
    });

    return user;
  }

  async checkUniqueValues(dto: CreateUserDto | UpdateUserDto): Promise<void> {
    const userByName: User | null = await this.prismaService.user.findFirst({
      where: { name: dto.name },
    });
    if (userByName != null) {
      throw new ConflictException(`User with name=${dto.name} already exists`);
    }

    const userByEmail: User | null = await this.prismaService.user.findFirst({
      where: { email: dto.email },
    });
    if (userByEmail != null) {
      throw new ConflictException(
        `User with email=${dto.email} already exists`,
      );
    }
  }
}
