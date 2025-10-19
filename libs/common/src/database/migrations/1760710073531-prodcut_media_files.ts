import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1760710073531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products_media_files" ("product_id" integer NOT NULL, "media_file_id" integer NOT NULL, CONSTRAINT "PK_2664cbb4bcae5c134ecaaf6474b" PRIMARY KEY ("product_id", "media_file_id"))`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products_media_files"`);

    }

}
