import { registerAs } from "@nestjs/config";
import { IgoogleConfig } from "../models";

export const googleconfig = registerAs("GOOGLECONFIG", (): IgoogleConfig => {
    return {
         clientID: process.env.GOOGLE_CLIENT_ID as string,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
         callbackURL: process.env.GOOGLE_CALLBACK_URL as string
    }
})

