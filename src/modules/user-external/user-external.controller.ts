// Importações 
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserExternalService } from './user-external.service';
import { CreateUserExternalDto } from './dto/userExternalDTO';
import { AuthGuard } from '../auth/auth.guard';
import { Public } from '../auth/skipAuth/skipAuth';
import { CheckPolicies } from '../casl/guards/policies.check';
import { AppAbility } from '../casl/casl-ability.factory/casl-ability.factory';
import { Action } from '../casl/casl-ability.factory/actionDTO/casl-actionDTO';
import { PoliciesGuard } from '../casl/guards/policies.guard';


// Garantindo a utilização da autenticação e autorização do usuário
@UseGuards(PoliciesGuard)
@Controller('userexternal')
export class UserExternalController {
  constructor(private readonly userExternalService: UserExternalService) {}

  @Public()
  @Post('registerExternal')
  create(@Body() createUserExternalDto: CreateUserExternalDto) {
    return this.userExternalService.register(createUserExternalDto);
  }


  @Get('users')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.General, 'all'))
  findAll() {
    return this.userExternalService.findAll();
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  findOne(@Param('id') id: string) {
    return this.userExternalService.findOne(id);
  }

  @Patch(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  update(@Param('id') id: string) {
    return this.userExternalService.update(+id);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  remove(@Param('id') id: string) {
    return this.userExternalService.delete(id);
  }
}
