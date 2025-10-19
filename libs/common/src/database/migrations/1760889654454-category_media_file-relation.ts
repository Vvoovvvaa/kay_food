import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1760889654454 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "category_media_files" ADD CONSTRAINT "FK_d6366cc6d401d1842d6320b8382" FOREIGN KEY ("media_file_id") REFERENCES "media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "category_media_files" DROP CONSTRAINT "FK_d6366cc6d401d1842d6320b8382"`);

    }

}
