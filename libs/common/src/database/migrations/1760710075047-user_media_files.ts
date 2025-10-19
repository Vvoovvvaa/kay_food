import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1760710075047 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_media_files" ("user_id" integer NOT NULL, "media_file_id" integer NOT NULL, CONSTRAINT "PK_357462598c18ca7fc05dc342662" PRIMARY KEY ("user_id", "media_file_id"))`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_media_files"`);

    }

}
