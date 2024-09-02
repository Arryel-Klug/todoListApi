import { SignInController } from "../application/controllers/authentication/SignInController";
import { makeSignInUseCase } from "./makeSignInUseCase";

export function makeSignInController(){
    const signInUseCase =  makeSignInUseCase();

    return new SignInController(signInUseCase);
}
