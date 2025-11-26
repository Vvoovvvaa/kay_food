import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "./base";
import { Language } from "./languages";
import { Category } from "./category";

@Entity('category-translation')
export class CategoryTranslation extends Base{
    @Column({name:"Category_name",nullable:false})
    name:string

    @Column({nullable:false})
    description:string

    @ManyToOne(() => Language,{onDelete:"CASCADE"})
    language:Language

    @ManyToOne(() => Category,{onDelete:'CASCADE'})
    @JoinColumn({name:'category_id'})
    category:Category
}