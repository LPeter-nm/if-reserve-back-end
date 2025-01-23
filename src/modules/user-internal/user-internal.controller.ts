import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserInternalService } from './user-internal.service';
import { CreateUserInternalDto } from './dto/userInternalDTO';
import { Public } from '../auth/skipAuth/skipAuth';

@Controller('user-internal')
export class UserInternalController {
  constructor(private readonly userInternalService: UserInternalService) {}

  @Public()
  @Post()
  create(@Body() createUserInternalDto: CreateUserInternalDto) {
    return this.userInternalService.register(createUserInternalDto);
  }

  @Get()
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
