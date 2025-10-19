import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1760889601231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "Categories" ADD CONSTRAINT "FK_c9d96085a7b6d7903284da20c74" FOREIGN KEY ("Parent_id") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "Categories" DROP CONSTRAINT "FK_c9d96085a7b6d7903284da20c74"`);

    }

}
