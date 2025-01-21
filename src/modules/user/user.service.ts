import { Injectable } from '@nestjs/common';
import { CreateUserDto, Role, Type_User } from './dto/userDTO';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService){}

  async create(body: CreateUserDto) { 
    const user = await this.prisma.user.create({
      data: {
        name: "",
        email: "",
        password: "",
        role: body.role,
        type_User: body.type_User,
        },
      select: {
        id: true,
        name: true, 
        email: true,
        role: true,
        userExternal: {
          select: {
            id: true,
          }
        },
        userInternal: {
          select: {
            id: true,
          }
        }
      }
      });

      return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({})

    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
