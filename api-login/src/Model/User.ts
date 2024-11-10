import bcrypt from 'bcrypt';
import UserDto from '../DTO/UserDTO';
import Userdb from '../../database/Model/Users';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import ErrorResponse from '../Err/ErroResponse';
const SECRET_KEY: string = 'thiago_secreto';

class User {
    id: number
    nome: string;
    email: string;
    senha: string;

    constructor(id: number = 0, nome: string = '', email: string = '', senha: string = '') {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    /**
     * createUser
     */
    public async createUser(dto: UserDto): Promise<User | ErrorResponse> {
        try {
            const senha = await bcrypt.hash(dto.senha, 10);

            const newUser = await Userdb.create({
                nome: dto.nome,
                email: dto.email,
                senha: senha,
            })

            return new User(
                newUser.dataValues.id,
                newUser.dataValues.nome,
                newUser.dataValues.email,
                newUser.dataValues.senha
            )

        }
        catch (error) {
            return {
                message: "Erro ao criar 'newUser'",
                error
            }
        }
    }

    /**
     * validateDTO
     */
    public static validateDTO(dtoClass: any) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                // Transformando o JSON da requisição no DTO
                const dto = plainToInstance(dtoClass, req.body);

                // Validando o DTO
                await validateOrReject(dto);

                // Se passar na validação, continuamos para o próximo middleware
                next();
            } catch (errors) {
                // Se falhar, retorna um erro com os detalhes da validação
                res.status(400).json({
                    message: 'Erro de validação',
                    errors,
                });
            }
        };
    }

    // Middleware para validar o token
    public static validateToken(req: Request, res: Response, next: NextFunction): void {

        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            res.status(403).json({ message: 'Token não fornecido' });
            return;
        }
        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'thiago_secreto', (err, decoded) => {

            if (err) {

                if (err.name === "TokenExpiredError") {

                    res.status(401).send({ message: "Token expirado!" });

                } else {

                    res.status(401).send({ message: "Token invalido!" });

                }
                return;
            }

            next();
        });

    }
}

export default User;