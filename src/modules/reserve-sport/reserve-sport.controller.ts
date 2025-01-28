import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReserveSportService } from './reserve-sport.service';
import {
  CreateReserveSportDto,
  UpdateReserveSportDto,
} from './dto/create-reserve-sport.dto';

@Controller('reserve-sport')
export class ReserveSportController {
  constructor(private readonly reserveSportService: ReserveSportService) {}

  @Post()
  create(@Body() body: CreateReserveSportDto) {
    return this.reserveSportService.create(body);
  }

  @Get()
  findAll() {
    return this.reserveSportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reserveSportService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateReserveSportDto) {
    return this.reserveSportService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reserveSportService.remove(id);
  }
}
