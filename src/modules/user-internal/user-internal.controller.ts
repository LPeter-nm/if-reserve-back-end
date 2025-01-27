import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
  Res,
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
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  findOne(@Param('id') id: string) {
    // const currentUsr = req.user;
    // if (id != currentUsr.id) {
    //   throw new ForbiddenException(
    //     'Você só pode acessar seus dados | deixe de ser curioso',
    //   );
    // }
    // res.status(200).json({ usr: this.userInternalService.findOne(id) });
    return this.userInternalService.findOne(id);
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
