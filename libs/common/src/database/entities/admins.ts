import { Column, Entity } from "typeorm";
import { Base } from "./base";
import { string } from "joi";

@Entity("admins")
export class Admins extends Base{
    @Column()
    name:string

    @Column()
    email:string

    @Column()
    password:string

    
}