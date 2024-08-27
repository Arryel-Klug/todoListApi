import { AuthenticationMiddleware } from "../application/middlewares/AuthenticationMiddlewares";

export function makeAuthenticationMiddleware(){
    return new AuthenticationMiddleware();
}
