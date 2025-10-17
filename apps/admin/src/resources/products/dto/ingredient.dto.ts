import { ApiHideProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"


export class ingrediendDTO{
    @IsNotEmpty()
    @IsString()
    @ApiHideProperty()
    name:string

    @IsNotEmpty()
    @IsNumber()
    @ApiHideProperty()
    price:number
}