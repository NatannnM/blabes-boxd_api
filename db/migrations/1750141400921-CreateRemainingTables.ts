import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRemainingTables1750141400921 implements MigrationInterface {
    name = 'CreateRemainingTables1750141400921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "diretor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(150) NOT NULL, "image" character varying, "sobre" character varying(300) NOT NULL, "birthDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_107dc6b273880bee9226d158334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "estudios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(150) NOT NULL, "sobre" character varying(300) NOT NULL, "launchDate" TIMESTAMP NOT NULL, "dono" character varying(150) NOT NULL, "image" character varying, CONSTRAINT "PK_d7791f4a9b2e2d998de26af94e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "filmes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(150) NOT NULL, "image" character varying NOT NULL, "launchDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_e7531027ca859ab4acb3a313658" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "nickname" character varying(150) NOT NULL, "photo" character varying NOT NULL, "email" character varying NOT NULL, "address" character varying(200) NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "admin" boolean NOT NULL, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "diretor_filmes" ("diretor_id" uuid NOT NULL, "filmes_id" uuid NOT NULL, CONSTRAINT "PK_d8c849edc20878a3554dcc8247b" PRIMARY KEY ("diretor_id", "filmes_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8cfbd3bb3031f5dac3a707d5a5" ON "diretor_filmes" ("diretor_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f8d4954204a7fe91a35196333c" ON "diretor_filmes" ("filmes_id") `);
        await queryRunner.query(`CREATE TABLE "estudios_filmes" ("estudios_id" uuid NOT NULL, "filmes_id" uuid NOT NULL, CONSTRAINT "PK_2f9329d30004b41e49e064ff8ad" PRIMARY KEY ("estudios_id", "filmes_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1dd5c6ecb4e8132846eee56ccb" ON "estudios_filmes" ("estudios_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_dc40c629388a6b1b6974401c1d" ON "estudios_filmes" ("filmes_id") `);
        await queryRunner.query(`CREATE TABLE "filmes_generos" ("filmes_id" uuid NOT NULL, "generos_id" uuid NOT NULL, CONSTRAINT "PK_5ea9ac721bbe6122d05bf350c2a" PRIMARY KEY ("filmes_id", "generos_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d69299dc4b5482a582ecb51724" ON "filmes_generos" ("filmes_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_333c97ab42fc8f44fe16dc1f67" ON "filmes_generos" ("generos_id") `);
        await queryRunner.query(`CREATE TABLE "usuarios_filmes" ("usuarios_id" uuid NOT NULL, "filmes_id" uuid NOT NULL, CONSTRAINT "PK_ce2b894e48a922c7380b346c0af" PRIMARY KEY ("usuarios_id", "filmes_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1bc12183b4638b5a40f2ea1c60" ON "usuarios_filmes" ("usuarios_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5cba3299b4e8698b76c6e90264" ON "usuarios_filmes" ("filmes_id") `);
        await queryRunner.query(`ALTER TABLE "diretor_filmes" ADD CONSTRAINT "FK_8cfbd3bb3031f5dac3a707d5a53" FOREIGN KEY ("diretor_id") REFERENCES "diretor"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "diretor_filmes" ADD CONSTRAINT "FK_f8d4954204a7fe91a35196333c2" FOREIGN KEY ("filmes_id") REFERENCES "filmes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "estudios_filmes" ADD CONSTRAINT "FK_1dd5c6ecb4e8132846eee56ccbc" FOREIGN KEY ("estudios_id") REFERENCES "estudios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "estudios_filmes" ADD CONSTRAINT "FK_dc40c629388a6b1b6974401c1d1" FOREIGN KEY ("filmes_id") REFERENCES "filmes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "filmes_generos" ADD CONSTRAINT "FK_d69299dc4b5482a582ecb517241" FOREIGN KEY ("filmes_id") REFERENCES "filmes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "filmes_generos" ADD CONSTRAINT "FK_333c97ab42fc8f44fe16dc1f67d" FOREIGN KEY ("generos_id") REFERENCES "generos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" ADD CONSTRAINT "FK_1bc12183b4638b5a40f2ea1c600" FOREIGN KEY ("usuarios_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" ADD CONSTRAINT "FK_5cba3299b4e8698b76c6e902648" FOREIGN KEY ("filmes_id") REFERENCES "filmes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" DROP CONSTRAINT "FK_5cba3299b4e8698b76c6e902648"`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" DROP CONSTRAINT "FK_1bc12183b4638b5a40f2ea1c600"`);
        await queryRunner.query(`ALTER TABLE "filmes_generos" DROP CONSTRAINT "FK_333c97ab42fc8f44fe16dc1f67d"`);
        await queryRunner.query(`ALTER TABLE "filmes_generos" DROP CONSTRAINT "FK_d69299dc4b5482a582ecb517241"`);
        await queryRunner.query(`ALTER TABLE "estudios_filmes" DROP CONSTRAINT "FK_dc40c629388a6b1b6974401c1d1"`);
        await queryRunner.query(`ALTER TABLE "estudios_filmes" DROP CONSTRAINT "FK_1dd5c6ecb4e8132846eee56ccbc"`);
        await queryRunner.query(`ALTER TABLE "diretor_filmes" DROP CONSTRAINT "FK_f8d4954204a7fe91a35196333c2"`);
        await queryRunner.query(`ALTER TABLE "diretor_filmes" DROP CONSTRAINT "FK_8cfbd3bb3031f5dac3a707d5a53"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5cba3299b4e8698b76c6e90264"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1bc12183b4638b5a40f2ea1c60"`);
        await queryRunner.query(`DROP TABLE "usuarios_filmes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_333c97ab42fc8f44fe16dc1f67"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d69299dc4b5482a582ecb51724"`);
        await queryRunner.query(`DROP TABLE "filmes_generos"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dc40c629388a6b1b6974401c1d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1dd5c6ecb4e8132846eee56ccb"`);
        await queryRunner.query(`DROP TABLE "estudios_filmes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f8d4954204a7fe91a35196333c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8cfbd3bb3031f5dac3a707d5a5"`);
        await queryRunner.query(`DROP TABLE "diretor_filmes"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "filmes"`);
        await queryRunner.query(`DROP TABLE "estudios"`);
        await queryRunner.query(`DROP TABLE "diretor"`);
    }

}
