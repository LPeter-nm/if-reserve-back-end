import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserExternalService } from './user-external.service';
import { CreateUserExternalDto } from './dto/userExternalDTO';
import { AuthGuard } from '../auth/auth.guard';
import { Public } from '../auth/skipAuth/skipAuth';


@Controller('userexternal')
export class UserExternalController {
  constructor(private readonly userExternalService: UserExternalService) {}

  @Public()
  @Post()
  create(@Body() createUserExternalDto: CreateUserExternalDto) {
    return this.userExternalService.register(createUserExternalDto);
  }

  @Public()
  @Get('users')
  findAll() {
    return this.userExternalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userExternalService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.userExternalService.update(+id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userExternalService.delete(id);
  }
}
