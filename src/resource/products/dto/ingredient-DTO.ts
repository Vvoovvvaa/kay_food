import { IsNotEmpty, IsNumber, IsString } from "class-validator"


export class ingrediendDTO{
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsNumber()
    price:number
}