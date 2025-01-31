import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateReserveEventDto, UpdateReserveEventDto } from './dto/eventDto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ReserveEventService {
  constructor(private readonly prisma: PrismaService) {}
  async create(body: CreateReserveEventDto, req: any) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException(
        'Somente administradores podem listar aulas',
      );

    const reserveCheck = await this.prisma.reserve.findUnique({
      where: { id: body.reserveId },
    });

    if (!reserveCheck)
      throw new HttpException('Reserva não encontrada', HttpStatus.NOT_FOUND);

    try {
      await this.prisma.reserve.update({
        where: { id: body.reserveId },
        data: {
          ocurrence: body.ocurrence,
          date_Start: body.date_Start,
          date_End: body.date_End,
          hour_Start: body.hr_Start,
          hour_End: body.hr_End,
        },
      });

      const event = await this.prisma.event.create({
        data: {
          name: body.name,
          description: body.description,
          reserveId: body.reserveId,
        },
        select: {
          id: true,
          name: true,
          description: true,
          reserve: {
            select: {
              date_Start: true,
              date_End: true,
              hour_Start: true,
              hour_End: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });

      return event;
    } catch (error) {
      return {
        message: 'Erro ao criar evento',
        error: error,
      };
    }
  }

  async findAll(req: any) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException(
        'Somente administradores podem listar aulas',
      );

    try {
      const events = await this.prisma.event.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          reserve: {
            select: {
              date_Start: true,
              date_End: true,
              hour_Start: true,
              hour_End: true,
            },
          },
        },
      });

      return events;
    } catch (error) {
      return {
        message: 'Erro ao listar eventos',
        error: error,
      };
    }
  }

  async findOne(id: string) {
    try {
      const event = await this.prisma.event.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          reserve: {
            select: {
              date_Start: true,
              date_End: true,
              hour_Start: true,
              hour_End: true,
            },
          },
        },
      });

      return event;
    } catch (error) {
      return {
        message: 'Erro ao listar evento',
        error: error,
      };
    }
  }

  async update(
    reserveId: string,
    id: string,
    body: UpdateReserveEventDto,
    req: any,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException(
        'Somente administradores podem atualizar aula',
      );

    const reserveCheck = await this.prisma.reserve.findUnique({
      where: { id: reserveId },
    });

    if (!reserveCheck)
      throw new HttpException('Reserva não encontrada', HttpStatus.NOT_FOUND);

    try {
      await this.prisma.reserve.update({
        where: { id: reserveId },
        data: {
          ocurrence: body.ocurrence,
          date_Start: body.date_Start,
          date_End: body.date_End,
          hour_Start: body.hr_Start,
          hour_End: body.hr_End,
        },
      });

      const event = await this.prisma.event.update({
        where: { id },
        data: {
          name: body.name,
          description: body.description,
          reserveId: reserveId,
        },
        select: {
          id: true,
          name: true,
          description: true,
          reserve: {
            select: {
              date_Start: true,
              date_End: true,
              hour_Start: true,
              hour_End: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });

      return event;
    } catch (error) {
      return {
        message: 'Erro ao atualizar evento',
        error: error,
      };
    }
  }

  async remove(id: string, req: any) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException(
        'Somente administradores podem deletar aula',
      );

    try {
      await this.prisma.event.delete({ where: { id } });

      return {
        message: 'Evento deletado com sucesso',
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      return {
        message: 'Erro ao deletar evento',
        error: error,
      };
    }
  }
}
