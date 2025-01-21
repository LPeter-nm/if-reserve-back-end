import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserExternalDto } from './dto/userExternalDTO';
import { PrismaService } from 'src/database/PrismaService';
import * as bcrypt from 'bcryptjs';
import { randomInt } from 'crypto';


@Injectable()
export class UserExternalService {
  constructor(private readonly prisma: PrismaService){}
  
  async register(body: CreateUserExternalDto) {
    const userCheck = await this.prisma.user.findUnique({where: {id: body.userId}})
    if(!userCheck){
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
    }

    const cpfCheck = await this.prisma.user_External.findUnique({where: {cpf: body.cpf}})
    if(cpfCheck){
      throw new HttpException('CPF já cadastrado', HttpStatus.BAD_REQUEST)
    }

    const randomPass = randomInt(10, 16);
    const hashedPassword = await bcrypt.hash(body.password, randomPass);

    const user = await this.prisma.user.create({
      data: {
        name: body.name, 
        email: body.email,
        password: hashedPassword,
      }
    })

    const userExternal = await this.prisma.user_External.create({
      data: {
        cpf: body.cpf, 
        phone: body.phone, 
        address: body.address,
        userId: body.userId,
      }
    })

    return {
      usr: user,
      infoUserExternal: userExternal
    }
  }

  async findAll() {
    const users = await this.prisma.user_External.findMany({
      select: {
        user: {
          select: {
            name: true, 
            email: true
          }
        },
        cpf: true, 
        phone: true,
        address: true
      }
    });

    return users;
  }

  async findOne(id: string) {
    return `This action returns a #${id} userExternal`;
  }

  update(id: number) {
    return `This action updates a #${id} userExternal`;
  }

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
