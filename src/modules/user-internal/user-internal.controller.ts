import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
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
  @Post()
  create(@Body() createUserInternalDto: CreateUserInternalDto) {
    return this.userInternalService.register(createUserInternalDto);
  }

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.General, 'all'))
  findAll() {
    return this.userInternalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userInternalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.userInternalService.update(+id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userInternalService.delete(id);
  }
}
