import { z, ZodError } from "zod";

import { IController, IRequest, IResponse } from "../interfaces/IController";
import { SignInUseCase } from "../useCases/authentication/SignInUseCase";
import { InvalidCredentials } from "../errors/InvalidCredentials";

const schema = z.object({
    email: z.string().email().min(1),
    password: z.string().min(8),

});

export class SignInController implements IController{
    constructor(private readonly signInUseCase: SignInUseCase) {}

    async handle({ body }: IRequest): Promise<IResponse> {
        try{
            const { email, password } = schema.parse(body);

            const { token } = await this.signInUseCase.execute({ email, password });

            return {
                statusCode: 200,
                body: {
                    token,
                },
            }

        } catch (error){
            if (error instanceof ZodError) {
                return {
                    statusCode: 400,
                    body: error.issues,
                };
            }
            if (error instanceof InvalidCredentials){
                return {
                    statusCode: 401,
                    body: {
                        error: 'Invalid Credentials.',
                    }
                }
            }

            throw error;
        }
    }
}
