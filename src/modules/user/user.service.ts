import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { PrismaService } from '@modules/prisma/prisma.service';
import { hashValue } from '@common/utils/hashValue.util';
import { mapInstance } from '@common/utils/map-instance.util';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async getById(id: string): Promise<ReadUserDto> {
    const user: User | null = await this.prismaService.user.findFirst({
      where: { id: id },
    });
    if (user == null) {
      throw new NotFoundException(`User with id=${id} not found`);
    }

    const schema: ReadUserDto = mapInstance(ReadUserDto, user);

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
