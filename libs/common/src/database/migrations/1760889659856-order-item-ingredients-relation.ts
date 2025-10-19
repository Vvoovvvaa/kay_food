import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1760889659856 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "order_item_ingredients" ADD CONSTRAINT "FK_19b5828f840851203fcb9c8250c" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "order_item_ingredients" DROP CONSTRAINT "FK_19b5828f840851203fcb9c8250c"`);

    }

}
