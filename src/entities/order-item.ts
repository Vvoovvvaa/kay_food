import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Base } from "./base";
  import { Order } from "./order";
import { Product } from "./product";
import { Ingredient } from "./ingredients";

@Entity("order_items")
export class OrderItem extends Base {
  @ManyToOne(() => Order, order => order.items, { onDelete: "CASCADE" })
  order: Order;

  @ManyToOne(() => Product, { eager: true, onDelete: "CASCADE" })
  product: Product;

  @Column()
  quantity: number;

  @Column("decimal", { precision: 10, scale: 2 ,nullable:true})
  price: number;

  @ManyToMany(() => Ingredient, { eager: true })
  @JoinTable({
    name: "order_item_extra_ingredients",
    joinColumn: { name: "order_item_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "ingredient_id", referencedColumnName: "id" },
  })
  ingredients: Ingredient[];
}
