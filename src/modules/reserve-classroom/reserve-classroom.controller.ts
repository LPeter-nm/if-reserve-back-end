import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ReserveClassroomService } from './reserve-classroom.service';
import {
  CreateReserveClassroomDto,
  UpdateReserveClassroomDto,
} from './dto/classroomDto';

@Controller('reserve-classroom')
export class ReserveClassroomController {
  constructor(
    private readonly reserveClassroomService: ReserveClassroomService,
  ) {}

  @Post()
  create(@Body() createReserveClassroomDto: CreateReserveClassroomDto) {
    return this.reserveClassroomService.create(createReserveClassroomDto);
  }

  @Get()
  findAll() {
    return this.reserveClassroomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reserveClassroomService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateReserveClassroomDto) {
    return this.reserveClassroomService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reserveClassroomService.remove(id);
  }
}
