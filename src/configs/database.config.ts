import { registerAs } from "@nestjs/config";
import { IDatabseConfig } from "src/models";



export const databaseConfig = registerAs("DATABASE_CONFIG", ():IDatabseConfig => {
    return { 
    HOST:process.env.DATABSE_HOST as string,
    NAME:process.env.DATABSE_NAME as string,
    USER:process.env.DATABSE_USER as string,
    PASSWORD:process.env.DATABSE_PASSWORD as string,
    PORT: Number(process.env.DATABSE_PORT as string)
    }
})