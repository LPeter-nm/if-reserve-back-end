import { Injectable } from '@nestjs/common';
import { CreateReserveEventDto, UpdateReserveEventDto } from './dto/eventDto';

@Injectable()
export class ReserveEventService {
  create(body: CreateReserveEventDto) {
    return 'This action adds a new reserveEvent';
  }

  findAll() {
    return `This action returns all reserveEvent`;
  }

  findOne(id: string) {
    return `This action returns a #${id} reserveEvent`;
  }

  update(id: string, body: UpdateReserveEventDto) {
    return `This action updates a #${id} reserveEvent`;
  }

  remove(id: string) {
    return `This action removes a #${id} reserveEvent`;
  }
}
