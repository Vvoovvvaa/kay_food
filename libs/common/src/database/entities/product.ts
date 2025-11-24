import { Base } from "./base";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinTable
} from "typeorm";
import { Category } from "./category";
import { MediaFiles } from "./media-files";
import { ProductTranslation } from "./product-translation";

@Entity("Products")
export class Product extends Base {
  // @Column({ name: "product_name" })
  // productName: string;

  // @Column({ nullable: true })
  // description: string;

  @Column()
  weight: number;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Category, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "Category_id" })
  category: Category;

  @ManyToMany(() => MediaFiles, { cascade: true })
  @JoinTable({
    name: "products_media_files",
    joinColumn: { name: "product_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "media_file_id", referencedColumnName: "id" }
  })
  mediaFiles: MediaFiles[];

  @OneToMany(() => ProductTranslation, pr => pr.product, {
    cascade: true
  })
  translation: ProductTranslation[];
}
