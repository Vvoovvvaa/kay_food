import { IsPhoneNumber } from "class-validator";

export class CreateAuthDto {
    @IsPhoneNumber()
    phone:string

    
}
