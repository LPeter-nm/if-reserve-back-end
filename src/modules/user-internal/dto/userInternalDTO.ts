import { IsNotEmpty } from 'class-validator';

export class CreateUserInternalDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  registration: string;

  @IsNotEmpty()
  userId: string;
}

export class UpdateUserInternalDto {
  name?: string;

  password?: string;
}
