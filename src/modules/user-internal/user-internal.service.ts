import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInternalDto } from './dto/userInternalDTO';
import { PrismaService } from 'src/database/PrismaService';
import { randomInt } from 'node:crypto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserInternalService {
  constructor(private readonly prisma: PrismaService){}

  async register(body: CreateUserInternalDto) {
    // Verificando se o usuário existe (se ele selecionou seu tipo de usuário na página anterior)
    const userCheck = await this.prisma.user.findUnique({where: {id: body.userId}})
    if(!userCheck){
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
    }

    // Criptografando a senha 
    const randomPass = randomInt(10, 16);
    const hashedPassword = await bcrypt.hash(body.password, randomPass);

    // Permitindo que todo servidor seja admin (fase inicial - ainda há muito o que melhorar)
    const registrationUpper = body.registration.toUpperCase()
    const serverCheck = registrationUpper.includes('TMN')
    if(!serverCheck){
      await this.prisma.user.update({
        where: {id: body.userId},
        data: {
          role: 'ADMIN'
        },
      })    
    }

    // Registrando nome, email, senha, matrícula e a id do usuário 
    await this.prisma.user.update({
      where: {id: body.userId},
      data: {
        name: body.name, 
        email: body.email,
        password: hashedPassword,
      },
    })

    const registerInternal = await this.prisma.user_Internal.create({
      data: {
        registration: body.registration,
        userId: body.userId,
      }, 
      select: {
        id: true,
        user: {
          select: {
            name: true, 
            email: true, 
            password: true, 
            role: true
          }
        },
        registration: true,
        userId: true,
      }
    })

    return {
      usr: registerInternal, 
      status: HttpStatus.OK
    }
  }

  async findAll() {
    const users = await this.prisma.user_Internal.findMany({
      select: {
        user: {
          select: {
            name: true, 
            email: true
          }
        },
        registration: true, 
        userId: true,
      }
    });

    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} userInternal`;
  }

  update(id: number) {
    return `This action updates a #${id} userInternal`;
  }

  async delete(id: string) {
    const userCheck = await this.prisma.user_Internal.findUnique({where: {id}})
    if(!userCheck) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
    }

    await this.prisma.user_Internal.delete({ where: {id}});

    return {
      message: 'Usuário deletado com sucesso', 
      status: HttpStatus.NO_CONTENT
    }
  }
}
