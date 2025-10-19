import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1760889651581 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "secret_code" ADD CONSTRAINT "FK_5319798443bb0ff3e9637cc9fec" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "secret_code" DROP CONSTRAINT "FK_5319798443bb0ff3e9637cc9fec"`);

    }

}
