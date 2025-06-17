import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertUsuarios1750189583458 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            INSERT INTO usuarios(id, name, nickname, photo, email, address, password, phone, admin)
            VALUES
            ('7e4728d3-ffb5-4ad0-a7c5-c9275c2acb75', 'Manoel Gomes', 'Caneta Azul', 'https://agoralaguna.com.br/wp-content/uploads/2024/01/manoel-gomes.jpg', 'manoel@gmail.com', 'Rua Joaquim Nabuco', '12345678', '48996658439', true),
            ('07656c84-3fff-41b5-b13b-6ba00286f0e7', 'Francisco', 'Chico Moedas', 'https://www.alagoas24horas.com.br/wp-content/uploads/2025/01/Chico-Moedas.jpeg', 'chico@gmail.com', 'Rua Melvin Jones', '87654321', '48995587421', false)
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            DELETE FROM usuarios WHERE id = '7e4728d3-ffb5-4ad0-a7c5-c9275c2acb75';
            DELETE FROM usuarios WHERE id = '07656c84-3fff-41b5-b13b-6ba00286f0e7';
            `)
    }

}
