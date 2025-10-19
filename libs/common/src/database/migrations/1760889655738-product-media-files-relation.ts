import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1760889655738 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "products_media_files" ADD CONSTRAINT "FK_bb2eec7ac4ac06a1e91ac770f60" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "products_media_files" DROP CONSTRAINT "FK_bb2eec7ac4ac06a1e91ac770f60"`);

    }

}
