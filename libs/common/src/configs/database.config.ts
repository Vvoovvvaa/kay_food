import { registerAs } from "@nestjs/config";
import { IDatabseConfig } from "../models";



export const databaseConfig = registerAs("DATABASE_CONFIG", ():IDatabseConfig => {
    return { 
    HOST:process.env.DATABASE_HOST as string,
    NAME:process.env.DATABASE_NAME as string,
    USER:process.env.DATABASE_USER as string,
    PASSWORD:process.env.DATABASE_PASSWORD as string,
    PORT: Number(process.env.DATABASE_PORT as string)
    }
})