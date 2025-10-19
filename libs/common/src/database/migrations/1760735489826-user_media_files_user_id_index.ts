import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1760735489826 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_e1846a30fd64b7721f23499d78" ON "user_media_files" ("user_id") `);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_e1846a30fd64b7721f23499d78"`);

    }

}
