import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
    id?: number

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    senha: string;

    constructor(nome: string, email: string, senha: string) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

}

export default CreateUserDTO;