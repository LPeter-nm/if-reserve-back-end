import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/userDTO';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async register(body: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        name: '',
        email: '',
        password: '',
        role: 'USER',
        type_User: body.type_User,
      },
      select: {
        id: true,
        role: true,
        type_User: true,
      },
    });

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        role: true,
        type_User: true,
      },
    });

    return users;
  }

  async findOne(email: string) {
    const usrCheck = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!usrCheck) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    return usrCheck;
  }

  async delete(id: string) {
    const user = this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    await this.prisma.user.delete({ where: { id } });

    return {
      message: 'Usuário deletado com sucesso',
      status: HttpStatus.OK,
    };
  }
}
