import { IsNotEmpty } from "class-validator";

export class CreateUserExternalDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    cpf: string;

    phone?: string;

    address?: string;

    @IsNotEmpty()
    userId: string
}
