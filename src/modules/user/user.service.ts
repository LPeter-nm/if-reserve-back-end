import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, Role, Type_User } from './dto/userDTO';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService){}

  async create(body: CreateUserDto) { 
    if(body.type_User === Type_User.SERVIDOR){
      body.role = Role.ADMIN
    } else {
      body.role = Role.USER
    }

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

  async findOne(id: string) {
    const user = this.prisma.user.findUnique({
      where: {
        id
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
    })

    if(!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
    }

    return user;

  }

  async delete(id: string) {
    const user = this.prisma.user.findUnique({where: {id}});

    if(!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
    }

    await this.prisma.user.delete({where: {id}});

    return {
      message: 'Usuário deletado com sucesso',
      status: HttpStatus.OK
    }
  }
}
