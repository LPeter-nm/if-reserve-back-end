import { PartialType } from '@nestjs/mapped-types';
import { CreateUserInternalDto } from './create-user-internal.dto';

export class UpdateUserInternalDto extends PartialType(CreateUserInternalDto) {}
