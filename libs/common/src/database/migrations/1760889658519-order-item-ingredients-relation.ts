import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1760889658519 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "order_item_ingredients" ADD CONSTRAINT "FK_9eedd51b57926c1df863ebf7239" FOREIGN KEY ("order_item_id") REFERENCES "order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "order_item_ingredients" DROP CONSTRAINT "FK_9eedd51b57926c1df863ebf7239"`);

    }

}
