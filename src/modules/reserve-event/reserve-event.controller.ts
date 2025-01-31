import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { ReserveEventService } from './reserve-event.service';
import { CreateReserveEventDto, UpdateReserveEventDto } from './dto/eventDto';
import { PoliciesGuard } from '../casl/guards/policies.guard';
import { CheckPolicies } from '../casl/guards/policies.check';
import { AppAbility } from '../casl/casl-ability.factory/casl-ability.factory';
import { Action } from '../casl/casl-ability.factory/actionDTO/casl-actionDTO';

@UseGuards(PoliciesGuard)
@Controller('reserve-event')
export class ReserveEventController {
  constructor(private readonly reserveEventService: ReserveEventService) {}

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  create(@Body() body: CreateReserveEventDto, @Req() req: any) {
    return this.reserveEventService.create(body, req);
  }

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  findAll(@Req() req: any) {
    return this.reserveEventService.findAll(req);
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  findOne(@Param('id') id: string) {
    return this.reserveEventService.findOne(id);
  }

  @Put(':reserveId/:id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  update(
    @Param('reserveId') reserveId: string,
    @Param('id') id: string,
    @Body() body: UpdateReserveEventDto,
    @Req() req: any,
  ) {
    return this.reserveEventService.update(reserveId, id, body, req);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  remove(@Param('id') id: string, @Req() req: any) {
    return this.reserveEventService.remove(id, req);
  }
}
