import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/userDTO';
import { PoliciesGuard } from '../casl/guards/policies.guard';
import { Public } from '../auth/skipAuth/skipAuth';
import { CheckPolicies } from '../casl/guards/policies.check';
import { AppAbility } from '../casl/casl-ability.factory/casl-ability.factory';
import { Action } from '../casl/casl-ability.factory/actionDTO/casl-actionDTO';

@UseGuards(PoliciesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @Public()
  register(@Body() body: CreateUserDto) {
    return this.userService.register(body);
  }


  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.General, 'all'))
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.General, 'all'))
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.General, 'all'))
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
