import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1760734654927 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_6bd501c260358e2eecc0716a06" ON "category_media_files" ("category_id") `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_6bd501c260358e2eecc0716a06"`);

    }

}
