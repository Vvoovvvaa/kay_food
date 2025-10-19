import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1760710071877 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "zones" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "perimeter" jsonb NOT NULL, CONSTRAINT "PK_880484a43ca311707b05895bd4a" PRIMARY KEY ("id"))`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "zones"`);

    }

}
