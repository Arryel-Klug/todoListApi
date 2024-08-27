import { SignInUseCase } from "../application/useCases/authentication/SignInUseCase";

export function makeSignInUseCase(){
    return new SignInUseCase();
}
