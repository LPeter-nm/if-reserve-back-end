import { Injectable } from '@nestjs/common';
import { CreateUserExternalDto } from './dto/create-user-external.dto';
import { UpdateUserExternalDto } from './dto/update-user-external.dto';

@Injectable()
export class UserExternalService {
  create(createUserExternalDto: CreateUserExternalDto) {
    return 'This action adds a new userExternal';
  }

  findAll() {
    return `This action returns all userExternal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userExternal`;
  }

  update(id: number, updateUserExternalDto: UpdateUserExternalDto) {
    return `This action updates a #${id} userExternal`;
  }

  remove(id: number) {
    return `This action removes a #${id} userExternal`;
  }
}
