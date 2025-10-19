import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1760735663456 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`CREATE INDEX "IDX_9b10bf53f6d16b355ce259098d" ON "user_favorites" ("usersId") `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`DROP INDEX "public"."IDX_66284736af2f31f95c22d0b36c"`);

    }

}
