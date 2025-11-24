import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./base";
import { ProductLanguage } from "../enums";

@Entity()
export class Language extends Base{
    @Column({enum:ProductLanguage,default: ProductLanguage.ENGLISH,type:'enum'})
    name:ProductLanguage


}