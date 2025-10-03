import { registerAs } from "@nestjs/config";

export const jwtConfig = registerAs('JWT_CONFIG',() => {
    return {
        secret: process.env.JWT_SECRET as string,
        secret1: process.env.JWT_SECRET1 as string,
    }
})