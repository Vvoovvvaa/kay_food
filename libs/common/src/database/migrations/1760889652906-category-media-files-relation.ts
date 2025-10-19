import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1760889652906 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "category_media_files" ADD CONSTRAINT "FK_6bd501c260358e2eecc0716a06e" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "category_media_files" DROP CONSTRAINT "FK_6bd501c260358e2eecc0716a06e"`);

    }

}
