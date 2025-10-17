import { ApiHideProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MinLength, IsOptional, IsNumber, isString } from "class-validator"



export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    @ApiHideProperty()
    categoryName:string

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @ApiHideProperty()
    description:string

    @IsOptional()
    @IsNumber()
    @ApiHideProperty()
    parentId:number
}
