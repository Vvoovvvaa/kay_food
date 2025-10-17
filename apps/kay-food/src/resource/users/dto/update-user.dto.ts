import { IsNumber, IsString, Max, Min, MinLength } from "class-validator"

export class UpdateUserDto{
    @IsString()
    @MinLength(3)
    firstName?:string

    @IsString()
    @MinLength(3)
    lastName?:string

    @IsNumber()
    @Min(16)
    @Max(90)
    age?:number
}
