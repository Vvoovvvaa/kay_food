import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./base";
import { MediaFiles } from "./media-files";

@Entity('Categories')
export class Category extends Base{
    @Column({name:"category_name"})
    categoryName:string

    @Column()
    description:string

    @ManyToOne(() => Category,category => category.children)
    @JoinColumn({name:'Parent_id'})
    parent:Category | null

    @OneToMany(() => Category,category =>category.parent)
    children:Category[]

    @ManyToMany(() => MediaFiles,{cascade:true})
    @JoinTable({
        name:"category_media_files",
        joinColumn:{name:"category_id",referencedColumnName:"id"},
        inverseJoinColumn:{name:"media_file_id",referencedColumnName:"id"}
    })
    mediaFiles:MediaFiles[]
}