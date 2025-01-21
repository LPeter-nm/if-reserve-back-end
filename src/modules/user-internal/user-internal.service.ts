import { Injectable } from '@nestjs/common';
import { CreateUserInternalDto } from './dto/create-user-internal.dto';
import { UpdateUserInternalDto } from './dto/update-user-internal.dto';

@Injectable()
export class UserInternalService {
  create(createUserInternalDto: CreateUserInternalDto) {
    return 'This action adds a new userInternal';
  }

  findAll() {
    return `This action returns all userInternal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userInternal`;
  }

  update(id: number, updateUserInternalDto: UpdateUserInternalDto) {
    return `This action updates a #${id} userInternal`;
  }

  remove(id: number) {
    return `This action removes a #${id} userInternal`;
  }
}
