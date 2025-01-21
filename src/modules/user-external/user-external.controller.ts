import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserExternalService } from './user-external.service';
import { CreateUserExternalDto } from './dto/create-user-external.dto';
import { UpdateUserExternalDto } from './dto/update-user-external.dto';

@Controller('user-external')
export class UserExternalController {
  constructor(private readonly userExternalService: UserExternalService) {}

  @Post()
  create(@Body() createUserExternalDto: CreateUserExternalDto) {
    return this.userExternalService.create(createUserExternalDto);
  }

  @Get()
  findAll() {
    return this.userExternalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userExternalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserExternalDto: UpdateUserExternalDto) {
    return this.userExternalService.update(+id, updateUserExternalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userExternalService.remove(+id);
  }
}
