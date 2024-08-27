import { SignUpUseCase } from "../application/useCases/authentication/SignUpUseCase";

export function makeSignUpUseCase(){
    const SALT = 10;
    return new SignUpUseCase(SALT);
}
