import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  CreateUserExternalDto,
  UpdateUserExternalDto,
} from './dto/userExternalDTO';
import { PrismaService } from 'src/database/PrismaService';
import * as bcrypt from 'bcryptjs';
import { randomInt } from 'crypto';

@Injectable()
export class UserExternalService {
  constructor(private readonly prisma: PrismaService) {}

  async registerExternal(body: CreateUserExternalDto) {
    const usrRegistered = await this.prisma.user_External.findFirst({
      where: { userId: body.userId },
    });
    if (usrRegistered)
      throw new HttpException(
        'Usuário já se registrou no sistema',
        HttpStatus.CONFLICT,
      );

    const cpfRegistered = await this.prisma.user_External.findUnique({
      where: { cpf: body.cpf },
    });
    if (cpfRegistered)
      throw new HttpException(
        'CPF já cadastrado no sistema',
        HttpStatus.BAD_REQUEST,
      );

    const userCheck = await this.prisma.user.findUnique({
      where: { id: body.userId },
    });
    if (!userCheck)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    const randomPass = randomInt(10, 16);
    const hashedPassword = await bcrypt.hash(body.password, randomPass);

    try {
      if (!body.email.includes('@'))
        throw new HttpException(
          'O Email está incorreto',
          HttpStatus.BAD_REQUEST,
        );

      if (
        userCheck.type_User === 'ALUNO' ||
        userCheck.type_User === 'SERVIDOR'
      ) {
        // Garantindo que só usuários externos possam se registrar
        throw new HttpException(
          'Você não pode se registrar sendo aluno ou servidor',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.prisma.user.update({
        where: {
          id: body.userId,
        },
        data: {
          name: body.name,
          email: body.email,
          password: hashedPassword,
        },
      });

      const usr = await this.prisma.user_External.create({
        data: {
          cpf: body.cpf,
          phone: body.phone,
          address: body.address,
          userId: body.userId,
        },
        select: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
            },
          },
          cpf: true,
          phone: true,
          address: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return usr;
    } catch (error) {
      return {
        message: 'Erro ao criar usuário externo',
        error: error,
      };
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user_External.findMany({
        select: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
          cpf: true,
          phone: true,
          address: true,
        },
      });

      return users;
    } catch (error) {
      return {
        message: 'Erro ao listar usuários externos',
        error: error,
      };
    }
  }

  async findOne(id: string, req: any) {
    try {
      const usrExternal = await this.prisma.user_External.findFirst({
        where: { id },
        select: {
          user: {
            select: {
              name: true,
              email: true,
              password: true,
            },
          },
          cpf: true,
          phone: true,
          address: true,
          userId: true,
        },
      });

      const usr = await this.prisma.user.findUnique({
        where: { id: usrExternal.userId },
      });

      if (usr.id !== req.user.id)
        throw new ForbiddenException(
          'Você só pode acessar seus dados | deixe de ser curioso',
        );

      if (!usrExternal)
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

      return usrExternal;
    } catch (error) {
      return {
        message: 'Erro ao listar dados do usuário externo',
        error: error,
      };
    }
  }

  async update(id: string, body: UpdateUserExternalDto) {
    const usr = await this.prisma.user_External.findUnique({ where: { id } });
    if (!usr)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    const randomPass = randomInt(10, 16);
    const hashedPassword = await bcrypt.hash(body.password, randomPass);

    try {
      await this.prisma.user.update({
        where: { id },
        data: {
          name: body.name,
          password: hashedPassword,
        },
      });
      const usrUpdated = await this.prisma.user_External.update({
        where: { id },
        data: {
          phone: body.phone,
          address: body.address,
        },
        select: {
          id: true,
          user: {
            select: {
              name: true,
              email: true,
              password: true,
            },
          },
          phone: true,
          address: true,
        },
      });

      return usrUpdated;
    } catch (error) {
      return {
        message: 'Erro ao atualizar usuário externo',
        error: error,
      };
    }
  }

  async delete(id: string) {
    const userCheck = await this.prisma.user_External.findUnique({
      where: { id },
    });
    if (!userCheck) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    try {
      await this.prisma.user_External.delete({ where: { id } });

      return {
        message: 'Usuário deletado com sucesso',
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      return {
        message: 'Erro ao deletar usuário externo',
        error: error,
      };
    }
  }
}
