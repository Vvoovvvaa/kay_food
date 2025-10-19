import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1760710072661 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category_media_files" ("category_id" integer NOT NULL, "media_file_id" integer NOT NULL, CONSTRAINT "PK_7a587e5c69961ea3176d1d539e3" PRIMARY KEY ("category_id", "media_file_id"))`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "category_media_files"`);

    }

}
