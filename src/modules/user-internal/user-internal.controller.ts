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
import { UserInternalService } from './user-internal.service';
import { CreateUserInternalDto } from './dto/userInternalDTO';
import { Public } from '../auth/skipAuth/skipAuth';
import { CheckPolicies } from '../casl/guards/policies.check';
import { AppAbility } from '../casl/casl-ability.factory/casl-ability.factory';
import { Action } from '../casl/casl-ability.factory/actionDTO/casl-actionDTO';
import { PoliciesGuard } from '../casl/guards/policies.guard';

@UseGuards(PoliciesGuard)
@Controller('user-internal')
export class UserInternalController {
  constructor(private readonly userInternalService: UserInternalService) {}

  @Public()
  @Post('register')
  create(@Body() body: CreateUserInternalDto) {
    return this.userInternalService.register(body);
  }

  @Get('users')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.General, 'all'))
  findAll() {
    return this.userInternalService.findAll();
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.userInternalService.findOne(id, req);
  }

  @Put(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  update(@Param('id') id: string, @Body() body: CreateUserInternalDto) {
    return this.userInternalService.update(id, body);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.General, 'all'))
  delete(@Param('id') id: string) {
    return this.userInternalService.delete(id);
  }
}
