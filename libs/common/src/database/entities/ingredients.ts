import { Column, Entity } from "typeorm";
import { Base } from "./base";

@Entity("ingredients")
export class Ingredient extends Base {
  @Column()
  name: string;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  price: number; 
}
