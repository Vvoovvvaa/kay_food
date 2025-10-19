import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1760889604189 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "Products" ADD CONSTRAINT "FK_de17978b1354a13a963601a12e6" FOREIGN KEY ("Category_id") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "Products" DROP CONSTRAINT "FK_de17978b1354a13a963601a12e6"`);


    }

}
