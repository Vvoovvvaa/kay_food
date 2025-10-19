import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1760734800847 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_bb2eec7ac4ac06a1e91ac770f6" ON "products_media_files" ("product_id") `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_bb2eec7ac4ac06a1e91ac770f6"`);

    }

}
