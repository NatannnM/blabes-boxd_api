import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertDiretor1750188052001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            INSERT INTO diretor(id, nome, image, sobre, "birthDate")
            VALUES
            ('12287b7b-147b-4a11-9aae-bdc558ff8b1b', 'Denis Villeneuve', 'https://img.melhoresfilmes.com.br/unsafe/480x640/https%3A%2F%2Fwww.melhoresfilmes.com.br%2Fstorage%2Fimgs%2Fdirectors%2F1156.jpg%3Ft%3D20221024232533', 'É um cineasta canadense, graduado em Cinema pela Universidade do Quebec em Montreal.', '1967-10-03'),
            ('976c556f-84aa-455d-b8aa-42ec01748877', 'Martin Scorsese', 'https://midias.correiobraziliense.com.br/_midias/jpg/2023/10/26/1000x1000/1_martinscorsese_reproducaoimdb-30468732.jpg', ' É um cineasta, produtor de cinema, roteirista e ator norte-americano, vencedor do Oscar de melhor diretor por Os Infiltrados.', '1942-11-17')
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            DELETE FROM diretor WHERE id = '12287b7b-147b-4a11-9aae-bdc558ff8b1b';
            DELETE FROM diretor WHERE id = '976c556f-84aa-455d-b8aa-42ec01748877';
            `)
    }

}
