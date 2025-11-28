import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "./base";
import { Language } from "./languages";

@Entity("ingredients")
export class Ingredient extends Base {
  @Column()
  name: string;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  price: number; 

  @ManyToOne(() => Language)
  language:Language
}
