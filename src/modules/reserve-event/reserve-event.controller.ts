import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReserveEventService } from './reserve-event.service';
import { CreateReserveEventDto, UpdateReserveEventDto } from './dto/eventDto';

@Controller('reserve-event')
export class ReserveEventController {
  constructor(private readonly reserveEventService: ReserveEventService) {}

  @Post()
  create(@Body() body: CreateReserveEventDto) {
    return this.reserveEventService.create(body);
  }

  @Get()
  findAll() {
    return this.reserveEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reserveEventService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateReserveEventDto) {
    return this.reserveEventService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reserveEventService.remove(id);
  }
}
