import { IsNotEmpty } from "class-validator";
import { Base } from "src/entities/base";


export class ChechkCodeDto extends Base{
    @IsNotEmpty()
    code:string
}