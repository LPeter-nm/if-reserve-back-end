import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { ReserveClassroomService } from './reserve-classroom.service';
import {
  CreateReserveClassroomDto,
  UpdateReserveClassroomDto,
} from './dto/classroomDto';
import { CheckPolicies } from '../casl/guards/policies.check';
import { AppAbility } from '../casl/casl-ability.factory/casl-ability.factory';
import { Action } from '../casl/casl-ability.factory/actionDTO/casl-actionDTO';

@Controller('reserve-classroom')
export class ReserveClassroomController {
  constructor(
    private readonly reserveClassroomService: ReserveClassroomService,
  ) {}

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  create(
    @Body() createReserveClassroomDto: CreateReserveClassroomDto,
    @Req() req: any,
  ) {
    return this.reserveClassroomService.create(createReserveClassroomDto, req);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.reserveClassroomService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reserveClassroomService.findOne(id);
  }

  @Put(':reserveId/:id')
  update(
    @Param('reserveId') reserveId: string,
    @Param('id') id: string,
    @Body() body: UpdateReserveClassroomDto,
    @Req() req: any,
  ) {
    return this.reserveClassroomService.update(reserveId, id, body, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.reserveClassroomService.remove(id, req);
  }
}
