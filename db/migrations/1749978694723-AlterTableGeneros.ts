import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableGeneros1749978694723 implements MigrationInterface {
    name = 'AlterTableGeneros1749978694723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "generos" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "generos" ADD "nome" character varying(70) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "generos" ADD "nome" character varying NOT NULL`);
    }

}
