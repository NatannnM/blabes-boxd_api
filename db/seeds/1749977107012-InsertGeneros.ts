import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertGeneros1749977107012 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            INSERT INTO generos(id, nome)
            VALUES
            ('b6f6bdc8-53b3-4eef-bc3f-f6ed3636b000', 'Ação'),
            ('7913ba3a-33f5-4fe8-b8e4-17ea66fb06a2', 'Aventura'),
            ('b85220d8-f2a4-4a9f-afac-ee2dad085ca5', 'Ficção Científica'),
            ('fcfe32f6-45e6-4937-bd76-99a67f36c0ce', 'Mistério'),
            ('ac976fcb-4e71-4c46-9d14-d7f6fc54c60a', 'Terror')
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            DELETE FROM generos WHERE id = 'b6f6bdc8-53b3-4eef-bc3f-f6ed3636b000';
            DELETE FROM generos WHERE id = '7913ba3a-33f5-4fe8-b8e4-17ea66fb06a2';
            DELETE FROM generos WHERE id = 'b85220d8-f2a4-4a9f-afac-ee2dad085ca5';
            DELETE FROM generos WHERE id = 'fcfe32f6-45e6-4937-bd76-99a67f36c0ce';
            DELETE FROM generos WHERE id = 'ac976fcb-4e71-4c46-9d14-d7f6fc54c60a';
            `)
    }

}
