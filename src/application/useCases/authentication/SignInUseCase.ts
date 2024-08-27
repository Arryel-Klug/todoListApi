import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { prismaClient } from "../../libs/prismaClient";
import { InvalidCredentials } from "../../errors/InvalidCredentials";
import { env } from "../../config/env";

interface IInput{
    email: string;
    password: string;
}

interface IOutput {
    accessToken: string;
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

        const accessToken = sign(
            { sub: user.id },
            env.jwtSecret,
            {expiresIn: "1d"}
        );

        return {
            accessToken,
        }
    }
}
