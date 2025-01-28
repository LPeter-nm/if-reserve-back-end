import { Injectable } from '@nestjs/common';
import {
  CreateReserveClassroomDto,
  UpdateReserveClassroomDto,
} from './dto/classroomDto';

@Injectable()
export class ReserveClassroomService {
  create(body: CreateReserveClassroomDto) {
    return 'This action adds a new reserveClassroom';
  }

  findAll() {
    return `This action returns all reserveClassroom`;
  }

  findOne(id: string) {
    return `This action returns a #${id} reserveClassroom`;
  }

  update(id: string, body: UpdateReserveClassroomDto) {
    return `This action updates a #${id} reserveClassroom`;
  }

  remove(id: string) {
    return `This action removes a #${id} reserveClassroom`;
  }
}
