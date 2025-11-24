import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength, IsEmail } from "class-validator";

export class CreateAdminDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @MinLength(7)
    @IsString()
    @ApiProperty()
    password: string;
}
