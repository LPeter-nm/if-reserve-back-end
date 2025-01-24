import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserExternalDto } from './dto/userExternalDTO';
import { PrismaService } from 'src/database/PrismaService';
import * as bcrypt from 'bcryptjs';
import { randomInt } from 'crypto';


@Injectable()
export class UserExternalService {
  constructor(private readonly prisma: PrismaService){}
  
  // Registrando usuário externo no sistema
  async register(body: CreateUserExternalDto) {
    // Checando se o usário não está registrado
    const usrExternalCheck = await this.prisma.user_External.findFirst({where: {userId: body.userId}})
    if(usrExternalCheck) throw new HttpException('Usuário já se registrou no sistema', HttpStatus.CONFLICT)  
      
    const cpfCheck = await this.prisma.user_External.findUnique({where: {cpf: body.cpf}})
    if(cpfCheck) throw new HttpException('CPF já cadastrado', HttpStatus.BAD_REQUEST)
    
      // Checando se o usuário escolheu seu tipo de usuário
    const userCheck = await this.prisma.user.findUnique({where: {id: body.userId}})
    if(!userCheck) throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
    
    // Criptografando senha do usuário
    const randomPass = randomInt(10, 16);
    const hashedPassword = await bcrypt.hash(body.password, randomPass);

    // Registrando dados gerais do usuário externo
    await this.prisma.user.update({
      where: {
        id: body.userId
      },
      data: {
        name: body.name, 
        email: body.email,
        password: hashedPassword,
      }
    })

    // Registrando dados especificos do usuário externo
    const userExternal = await this.prisma.user_External.create({
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
            password: true
          }, 
        }, 
        cpf: true, 
        phone: true, 
        address: true,
        createdAt: true, 
        updatedAt: true
      }
    })

    return userExternal;
  }

  // Listando todos os usuários externos
  async findAll() {
    const users = await this.prisma.user_External.findMany({
      select: {
        user: {
          select: {
            name: true, 
            email: true, 
            role: true
          }
        },
        cpf: true, 
        phone: true,
        address: true
      }
    });

    return users;
  }

  // Listando um usuário externo 
  async findOne(id: string) {
    return `This action returns a #${id} userExternal`;
  }

  // Atualizando dados do usuário externo
  update(id: number) {
    return `This action updates a #${id} userExternal`;
  }

  // Deletando dados do usuário externo
  async delete(id: string) {
    const userCheck = await this.prisma.user_External.findUnique({where: {id}})
    if(!userCheck) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
    }

    await this.prisma.user_External.delete({ where: {id}});

    return {
      message: 'Usuário deletado com sucesso', 
      status: HttpStatus.NO_CONTENT
    }
  }
}
