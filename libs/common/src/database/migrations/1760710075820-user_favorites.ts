import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1760710075820 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_favorites" ("usersId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_5065e45fbc2a1f3e58a6fd9a430" PRIMARY KEY ("usersId", "productsId"))`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_favorites"`);

    }

}
