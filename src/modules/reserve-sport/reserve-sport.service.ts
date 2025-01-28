import { Injectable } from '@nestjs/common';
import {
  CreateReserveSportDto,
  UpdateReserveSportDto,
} from './dto/create-reserve-sport.dto';

@Injectable()
export class ReserveSportService {
  create(body: CreateReserveSportDto) {
    return 'This action adds a new reserveSport';
  }

  findAll() {
    return `This action returns all reserveSport`;
  }

  findOne(id: string) {
    return `This action returns a #${id} reserveSport`;
  }

  update(id: string, body: UpdateReserveSportDto) {
    return `This action updates a #${id} reserveSport`;
  }

  remove(id: string) {
    return `This action removes a #${id} reserveSport`;
  }
}
