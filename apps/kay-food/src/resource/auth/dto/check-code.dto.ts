import { IsNotEmpty } from "class-validator";
import { Base } from "@app/common/database/entities";


export class ChechkCodeDto extends Base{
    @IsNotEmpty()
    code:string
}