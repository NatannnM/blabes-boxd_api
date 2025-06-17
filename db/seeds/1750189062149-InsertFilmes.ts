import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertFilmes1750189062149 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            INSERT INTO filmes(id, title, image, "launchDate")
            VALUES
            ('d0ae0566-f5a5-41af-83d0-33973a2b830c', 'Duna', 'https://pgsramblings.wordpress.com/wp-content/uploads/2022/01/dune-2021.jpg?w=1024', '2021-10-21'),
            ('06914905-375b-4e1f-9dd0-a7de90426e84', 'Um Lugar Silencioso', 'https://br.web.img3.acsta.net/pictures/18/03/01/20/26/0577579.jpg', '2018-04-05')
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            DELETE FROM filmes WHERE id = 'd0ae0566-f5a5-41af-83d0-33973a2b830c';
            DELETE FROM filmes WHERE id = '06914905-375b-4e1f-9dd0-a7de90426e84';
            `)
    }

}
