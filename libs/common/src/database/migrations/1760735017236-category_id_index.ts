import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1760735017236 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_d6366cc6d401d1842d6320b838" ON "category_media_files" ("media_file_id") `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_d6366cc6d401d1842d6320b838"`);

    }

}
