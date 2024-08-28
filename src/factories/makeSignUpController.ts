import { SignUpController } from "../application/controllers/authentication/SignUpController";
import { makeSignUpUseCase } from "./makeSignUpUseCase";

export function makeSignUpController(){
    const signUpUseCase = makeSignUpUseCase();

    return new SignUpController(signUpUseCase);
}
