import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1760889657027 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "products_media_files" ADD CONSTRAINT "FK_b5ed1ce724e084d8c5f05948f58" FOREIGN KEY ("media_file_id") REFERENCES "media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "products_media_files" DROP CONSTRAINT "FK_b5ed1ce724e084d8c5f05948f58"`);

    }

}
