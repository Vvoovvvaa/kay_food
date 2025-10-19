import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1760735223059 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_b5ed1ce724e084d8c5f05948f5" ON "products_media_files" ("media_file_id") `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_b5ed1ce724e084d8c5f05948f5"`);

    }

}
