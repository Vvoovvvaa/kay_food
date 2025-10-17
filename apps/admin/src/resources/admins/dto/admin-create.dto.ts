import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";


export class CreateAdminDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @ApiProperty()
    adminName:string

    // @IsNotEmpty()
    // @IsEmail()
    email:"kay-food-support@gmail.com"

    @IsNotEmpty()
    @MinLength(7)
    @IsString()
    @ApiProperty()
    password:string
}