import { hash } from "bcryptjs";
import { UserAlreadyExists } from "../../errors/UserAlreadyExists";
import { prismaClient } from "../../libs/prismaClient";
import { generateAccessToken } from "../../utils/generateAccessToken";

interface IInput{
    name: string;
    email: string;
    password: string;
}

interface IOutput {
    token: string;
}

export class SignUpUseCase{

    constructor(private readonly salt: number){}

    async execute({ name,email,password }: IInput): Promise<IOutput> {
        const userAlreadyExists = await prismaClient.user.findUnique({
            where: { email },
        });

        if  (userAlreadyExists) {
            throw new UserAlreadyExists();
        }

        const hashedPassword = await hash(password, this.salt)

        const { id } = await prismaClient.user.create({
            data:{
                name,
                email,
                password: hashedPassword,
            }
        });

        const token = generateAccessToken(id);

        return {
            token,
        };

        }
    }


