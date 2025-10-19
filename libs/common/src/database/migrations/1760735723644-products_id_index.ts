import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1760735723644 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_152cb1955a8e956ffb7645fdf4" ON "user_favorites" ("productsId") `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_152cb1955a8e956ffb7645fdf4"`);

    }

}
