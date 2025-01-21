import { PartialType } from '@nestjs/mapped-types';
import { CreateUserExternalDto } from './create-user-external.dto';

export class UpdateUserExternalDto extends PartialType(CreateUserExternalDto) {}
