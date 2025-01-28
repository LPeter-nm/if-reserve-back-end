import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateReserveDto } from './dto/reserveDto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ReserveService {
  constructor(private readonly prisma: PrismaService) {}
  async createAdmin(body: CreateReserveDto) {
    try {
      const reserve = await this.prisma.reserve.create({
        data: {
          ...body,
          date_Start: '',
          date_End: '',
          hour_Start: '',
          hour_End: '',
        },
      });

      return reserve;
    } catch (error) {}
  }

  async createUser(body: CreateReserveDto, req: any) {
    const usr = await this.prisma.user.findUnique({
      where: { id: body.userId },
    });

    if (usr.id !== req.user.id)
      throw new ForbiddenException(
        'O usuário não corresponde ao token fornecido | Acesso não permitido',
      );

    try {
      const reserve = await this.prisma.reserve.create({
        data: {
          ...body,
          type_Reserve: 'OFICIO',
          date_Start: '',
          date_End: '',
          hour_Start: '',
          hour_End: '',
        },
      });

      return reserve;
    } catch (error) {
      return {
        message: 'Erro ao criar reserva',
        error: error,
      };
    }
  }

  async findAll() {
    try {
      const reserves = await this.prisma.reserve.findMany({
        select: {
          id: true,
          type_Reserve: true,
        },
      });

      return reserves;
    } catch (error) {
      return {
        message: 'Erro ao listar reservas',
        error: error,
      };
    }
  }

  async findOne(id: string) {
    try {
      const reserve = await this.prisma.reserve.findUnique({
        where: { id },
      });

      if (!reserve)
        throw new HttpException('Reserva não encontrada', HttpStatus.NOT_FOUND);

      return reserve;
    } catch (error) {
      return {
        message: 'Erro ao listar reserva',
        error: error,
      };
    }
  }

  async remove(id: string) {
    const reserve = await this.prisma.reserve.findUnique({
      where: { id },
    });

    if (!reserve)
      throw new HttpException('Reserva não encontrada', HttpStatus.NOT_FOUND);

    try {
      await this.prisma.reserve.delete({ where: { id } });

      return {
        message: 'Reserva deletada com sucesso',
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      return {
        message: 'Erro ao deletar reserva',
        error: error,
      };
    }
  }
}
