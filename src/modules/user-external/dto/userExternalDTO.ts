import { IsNotEmpty } from "class-validator";

// Atributos para registro do usuário externo 
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
