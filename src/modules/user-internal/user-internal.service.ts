import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  CreateUserInternalDto,
  UpdateUserInternalDto,
} from './dto/userInternalDTO';
import { PrismaService } from 'src/database/PrismaService';
import { randomInt } from 'node:crypto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserInternalService {
  constructor(private readonly prisma: PrismaService) {}

  async register(body: CreateUserInternalDto) {
    const userCheck = await this.prisma.user.findUnique({
      where: { id: body.userId },
    });
    if (!userCheck) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const registrationCheck = await this.prisma.user_Internal.findFirst({
      where: { registration: body.registration },
    });
    if (registrationCheck) {
      throw new HttpException(
        'Usuário já se registrou no sistema',
        HttpStatus.CONFLICT,
      );
    }

    const randomPass = randomInt(10, 16);
    const hashedPassword = await bcrypt.hash(body.password, randomPass);

    const registrationUpper = body.registration.toUpperCase();
    const serverCheck = registrationUpper.includes('TMN');

    try {
      // Garantindo que só usuários internos possam se registrar
      if (userCheck.type_User === 'EXTERNO') {
        throw new HttpException(
          'Você não pode se registrar sendo externo',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!serverCheck && userCheck.type_User === 'SERVIDOR') {
        await this.prisma.user.update({
          where: { id: body.userId },
          data: {
            role: 'ADMIN',
          },
        });
      }

      if (!body.email.includes('@'))
        throw new HttpException(
          'O Email está incorreto',
          HttpStatus.BAD_REQUEST,
        );

      await this.prisma.user.update({
        where: { id: body.userId },
        data: {
          name: body.name,
          email: body.email,
          password: hashedPassword,
        },
      });

      const registerInternal = await this.prisma.user_Internal.create({
        data: {
          registration: registrationUpper,
          userId: body.userId,
        },
        select: {
          id: true,
          user: {
            select: {
              name: true,
              email: true,
              password: true,
              role: true,
            },
          },
          registration: true,
          userId: true,
        },
      });

      return {
        usr: registerInternal,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Erro ao registrar usuário interno',
        error: error,
      };
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user_Internal.findMany({
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
          registration: true,
        },
      });

      return users;
    } catch (error) {
      return {
        message: 'Erro ao listar usuários internos',
        error: error,
      };
    }
  }

  async findOne(id: string, req: any) {
    try {
      const usrInternal = await this.prisma.user_Internal.findUnique({
        where: {
          id,
        },
      });

      const usr = await this.prisma.user.findUnique({
        where: { id: usrInternal.userId },
      });

      if (usr.id !== req.user.id)
        throw new ForbiddenException(
          'Você só pode acessar seus dados | deixe de ser curioso',
        );

      return usrInternal;
    } catch (error) {
      return {
        message: 'Erro ao listar usuário interno',
        error: error,
      };
    }
  }

  async update(id: string, body: UpdateUserInternalDto) {
    const usrCheck = await this.prisma.user_Internal.findUnique({
      where: { id },
    });

    if (!usrCheck)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    const randomPass = randomInt(10, 16);
    const hashedPassword = await bcrypt.hash(body.password, randomPass);

    try {
      const usrUpdated = await this.prisma.user.update({
        where: { id },
        data: {
          ...body,
          password: hashedPassword,
        },
      });

      if (!usrUpdated)
        throw new HttpException(
          'Erro ao atualizar dados do usuário',
          HttpStatus.BAD_REQUEST,
        );

      return usrUpdated;
    } catch (error) {
      return {
        message: 'Erro ao atualizar usuário interno',
        error: error,
      };
    }
  }

  async delete(id: string) {
    const userCheck = await this.prisma.user_Internal.findUnique({
      where: { id },
    });
    if (!userCheck) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    try {
      await this.prisma.user_Internal.delete({ where: { id } });

      return {
        message: 'Usuário deletado com sucesso',
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      return {
        message: 'Erro ao deletar usuário interno',
        error: error,
      };
    }
  }
}
