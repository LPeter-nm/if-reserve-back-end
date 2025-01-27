import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usr: UserService,
    private readonly jwt: JwtService,
  ) {}

  async singIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usr.findOne(email);

    if (!user)
      throw new HttpException('Email não registrado', HttpStatus.NOT_FOUND);

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck)
      throw new BadRequestException({
        message: 'Falha de autenticação.',
        error: 'Credenciais inválidas',
      });

    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }
}
