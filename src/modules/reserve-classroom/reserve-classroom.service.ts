import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  CreateReserveClassroomDto,
  UpdateReserveClassroomDto,
} from './dto/classroomDto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ReserveClassroomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateReserveClassroomDto, req: any) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException(
        'Somente administradores podem registrar aula',
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
      const classroom = await this.prisma.classroom.create({
        data: {
          course: body.course,
          matter: body.matter,
          reserveId: body.reserveId,
        },
        select: {
          id: true,
          course: true,
          matter: true,
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

      return classroom;
    } catch (error) {
      return {
        message: 'Erro ao registrar aula',
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
      const classrooms = await this.prisma.classroom.findMany({
        select: {
          id: true,
          course: true,
          matter: true,
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

      return classrooms;
    } catch (error) {
      return {
        message: 'Erro ao listar as aulas',
        error: error,
      };
    }
  }

  async findOne(id: string) {
    try {
      const classroom = await this.prisma.classroom.findUnique({
        where: { id },
        select: {
          id: true,
          course: true,
          matter: true,
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

      return classroom;
    } catch (error) {
      return {
        message: 'Erro ao listar aula',
        error: error,
      };
    }
  }

  async update(
    reserveId: string,
    id: string,
    body: UpdateReserveClassroomDto,
    req: any,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException(
        'Somente administradores podem atualizar a aula',
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
      const classroom = await this.prisma.classroom.update({
        where: { id },
        data: {
          course: body.course,
          matter: body.matter,
        },
        select: {
          id: true,
          course: true,
          matter: true,
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

      return classroom;
    } catch (error) {
      return {
        message: 'Erro ao registrar aula',
        error: error,
      };
    }
  }

  async remove(id: string, req: any) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException(
        'Somente administradores podem atualizar a aula',
      );

    try {
      await this.prisma.classroom.delete({ where: { id } });

      return {
        message: 'Aula deletada com sucesso',
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      return {
        message: 'Erro ao deletar aula',
        errort: error,
      };
    }
  }
}
