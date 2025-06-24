import { MigrationInterface, QueryRunner } from "typeorm";

export class TablesFinal1750747783288 implements MigrationInterface {
    name = 'TablesFinal1750747783288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" DROP CONSTRAINT "FK_1bc12183b4638b5a40f2ea1c600"`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" DROP CONSTRAINT "FK_5cba3299b4e8698b76c6e902648"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1bc12183b4638b5a40f2ea1c60"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5cba3299b4e8698b76c6e90264"`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" DROP CONSTRAINT "PK_ce2b894e48a922c7380b346c0af"`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" ADD CONSTRAINT "PK_1bc12183b4638b5a40f2ea1c600" PRIMARY KEY ("usuarios_id")`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" DROP COLUMN "filmes_id"`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" DROP CONSTRAINT "PK_1bc12183b4638b5a40f2ea1c600"`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" DROP COLUMN "usuarios_id"`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" ADD CONSTRAINT "PK_a2a1c0c84ceec820faea1a964e3" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" ADD "nota" numeric(2,1) NOT NULL DEFAULT 0.5`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" ADD "review" character varying(3000)`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" ADD "usuariosId" uuid`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" ADD "filmesId" uuid`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" ADD CONSTRAINT "FK_dfe4881629e3ab874cfb583a037" FOREIGN KEY ("usuariosId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" ADD CONSTRAINT "FK_1b781798eba77bba6bfc7fcbc0d" FOREIGN KEY ("filmesId") REFERENCES "filmes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" DROP CONSTRAINT "FK_1b781798eba77bba6bfc7fcbc0d"`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" DROP CONSTRAINT "FK_dfe4881629e3ab874cfb583a037"`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" DROP COLUMN "filmesId"`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" DROP COLUMN "usuariosId"`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" DROP COLUMN "review"`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" DROP COLUMN "nota"`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" DROP CONSTRAINT "PK_a2a1c0c84ceec820faea1a964e3"`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" ADD "usuarios_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" ADD CONSTRAINT "PK_1bc12183b4638b5a40f2ea1c600" PRIMARY KEY ("usuarios_id")`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" ADD "filmes_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" DROP CONSTRAINT "PK_1bc12183b4638b5a40f2ea1c600"`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" ADD CONSTRAINT "PK_ce2b894e48a922c7380b346c0af" PRIMARY KEY ("filmes_id", "usuarios_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_5cba3299b4e8698b76c6e90264" ON "usuarios_filmes" ("filmes_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1bc12183b4638b5a40f2ea1c60" ON "usuarios_filmes" ("usuarios_id") `);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" ADD CONSTRAINT "FK_5cba3299b4e8698b76c6e902648" FOREIGN KEY ("filmes_id") REFERENCES "filmes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" ADD CONSTRAINT "FK_1bc12183b4638b5a40f2ea1c600" FOREIGN KEY ("usuarios_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
