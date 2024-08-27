
import { verify } from "jsonwebtoken";
import { IData, IMiddleware, IRequest, IResponse } from "../interfaces/IMiddleware";
import { env } from "../config/env";

export class AuthenticationMiddleware implements IMiddleware{
    async handle({ headers }: IRequest): Promise<IResponse | IData>{
        const { authorization } =  headers;

        if (!authorization){
            return {
                statusCode: 401,
                body: null,
            };
        }

        try{
            const [type, token] = authorization.split(' ');

            if (type !== 'Bearer') {
                throw new Error();
            }

            const payload = verify(token, env.jwtSecret);

            return {
                data: {
                    userId: payload.sub,
                },
            };
        }catch {
            return{
                statusCode: 401,
                body: {
                    error: 'Invalid token.'
                },
            };
        }
    }
}
