import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableGeneros1749976497137 implements MigrationInterface {
    name = 'CreateTableGeneros1749976497137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "generos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, CONSTRAINT "PK_7ebe7a16bcbfd533d6445d74fef" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "generos"`);
    }

}
