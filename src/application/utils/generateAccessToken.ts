import { sign } from "jsonwebtoken";
import { env } from "../config/env";

export function generateAccessToken(userId: string){
    const token = sign(
        { sub: userId },
        env.jwtSecret,
        {expiresIn: "1d"}
    );

    return token;
}
