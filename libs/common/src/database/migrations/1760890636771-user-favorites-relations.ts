import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1760890636771 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "user_favorites" ADD CONSTRAINT "FK_152cb1955a8e956ffb7645fdf40" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "user_favorites" DROP CONSTRAINT "FK_152cb1955a8e956ffb7645fdf40"`);

    }

}
