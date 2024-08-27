import { compare } from "bcryptjs";
import { prismaClient } from "../../libs/prismaClient";
import { InvalidCredentials } from "../../errors/InvalidCredentials";
import { generateAccessToken } from "../../utils/generateAccessToken";

interface IInput{
    email: string;
    password: string;
}

interface IOutput {
    token: string;
}

export class SignInUseCase{
    async execute({ email, password }: IInput): Promise<IOutput> {
        const user = await prismaClient.user.findUnique({
            where: { email },
        });

        if (!user){
            throw new InvalidCredentials();
        }

        const isPasswordValid = compare(password, user.password);

        if (!isPasswordValid){
            throw new InvalidCredentials();
        }

        const token = generateAccessToken(user.id);

        return {
            token,
        };
    }
}
