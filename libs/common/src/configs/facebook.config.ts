import { registerAs } from "@nestjs/config";
import { IFacebookConfig } from "../models";

export const faceboockClientConfig = registerAs("FACEBOOK_CLIENT_CONFIG", (): IFacebookConfig => {
    return {
        clientId : process.env.FACEBOOK_CLIENT_ID as string,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET as string,
        clientUrl : process.env.FACEBOOK_CALLBACK_URL as string
    }
})