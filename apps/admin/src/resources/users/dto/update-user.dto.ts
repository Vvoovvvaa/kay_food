import { ApiHideProperty } from "@nestjs/swagger"
import { IsNumber, IsString, Max, Min, MinLength } from "class-validator"

export class UpdateUserDto{
    @IsString()
    @MinLength(3)
    @ApiHideProperty()
    firstName?:string

    @IsString()
    @MinLength(3)
    @ApiHideProperty()
    lastName?:string

    @IsNumber()
    @Min(16)
    @Max(90)
    @ApiHideProperty()
    age?:number
}
