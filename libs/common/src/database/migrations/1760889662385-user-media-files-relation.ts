import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1760889662385 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "user_media_files" ADD CONSTRAINT "FK_66284736af2f31f95c22d0b36c1" FOREIGN KEY ("media_file_id") REFERENCES "media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "user_media_files" DROP CONSTRAINT "FK_66284736af2f31f95c22d0b36c1"`);

    }

}
