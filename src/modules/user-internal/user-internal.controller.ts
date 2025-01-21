import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserInternalService } from './user-internal.service';
import { CreateUserInternalDto } from './dto/create-user-internal.dto';
import { UpdateUserInternalDto } from './dto/update-user-internal.dto';

@Controller('user-internal')
export class UserInternalController {
  constructor(private readonly userInternalService: UserInternalService) {}

  @Post()
  create(@Body() createUserInternalDto: CreateUserInternalDto) {
    return this.userInternalService.create(createUserInternalDto);
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
  update(@Param('id') id: string, @Body() updateUserInternalDto: UpdateUserInternalDto) {
    return this.userInternalService.update(+id, updateUserInternalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userInternalService.remove(+id);
  }
}
