import { z, ZodError } from "zod";

import { IController, IRequest, IResponse } from "../../interfaces/IController";
import { SignUpUseCase } from "../../useCases/authentication/SignUpUseCase";
import { UserAlreadyExists } from "../../errors/UserAlreadyExists";

const schema = z.object({
    name: z.string().min(2),
    email: z.string().email().min(1),
    password: z.string().min(8),

});

export class SignUpController implements IController{
    constructor(private readonly signUpUseCase: SignUpUseCase) {}

    async handle({ body }: IRequest): Promise<IResponse> {
        try{
            const { name, email, password } = schema.parse(body);

            const { token } = await this.signUpUseCase.execute({name, email, password});

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
            if (error instanceof UserAlreadyExists){
                return {
                    statusCode: 409,
                    body: {
                        error: 'This e-mail is already in use.'
                    }
                }
            }

            throw error;
        }
    }
}
