import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/PrismaService';
import { createAppDto } from './appDto/appDto';
import { randomInt } from 'node:crypto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  helloWorld() {
    return 'Servidor online';
  }

  async userAdmin(body: createAppDto) {
    const randomPass = randomInt(10, 16);
    const hashedPassword = await bcrypt.hash(body.password, randomPass);

    const usrGeneral = await this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        role: 'GENERAL',
        type_User: 'SERVIDOR',
      },
    });

    return usrGeneral;
  }
}
