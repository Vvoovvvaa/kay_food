import { Column, Entity, ManyToOne} from "typeorm";
import { Product } from "./product";
import { Language } from "./languages";
import { Base } from "./base";

@Entity("product_translation")
export class ProductTranslation extends Base {
  @Column({ name: "product_name" })
  productName: string;

  @Column({ nullable: true })
  description: string;

  // @Column()
  // weight: number;

  // @Column("decimal", { precision: 10, scale: 2 })
  // price: number;

  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  product: Product;

  @ManyToOne(() => Language, { onDelete:"CASCADE" })
  language: Language;
}
