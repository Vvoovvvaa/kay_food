import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./base";
import { Languages } from "../enums";

@Entity()
export class Language extends Base{
    @Column({enum:Languages,default: Languages.ENGLISH,type:'enum'})
    name:Languages


}