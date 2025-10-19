import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1760710074265 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_item_ingredients" ("order_item_id" integer NOT NULL, "ingredient_id" integer NOT NULL, CONSTRAINT "PK_69ee208b4e02f6f3fc8d1c9f038" PRIMARY KEY ("order_item_id", "ingredient_id"))`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "order_item_ingredients"`);

    }

}
