import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1760735385267 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_19b5828f840851203fcb9c8250" ON "order_item_ingredients" ("ingredient_id") `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_19b5828f840851203fcb9c8250"`);

    }

}
