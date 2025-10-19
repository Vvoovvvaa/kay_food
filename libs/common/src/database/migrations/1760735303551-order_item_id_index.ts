import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1760735303551 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_9eedd51b57926c1df863ebf723" ON "order_item_ingredients" ("order_item_id") `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_9eedd51b57926c1df863ebf723"`);

    }

}
