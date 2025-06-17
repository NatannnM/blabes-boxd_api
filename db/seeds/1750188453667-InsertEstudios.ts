import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertEstudios1750188453667 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            INSERT INTO estudios(id, nome, sobre, "launchDate", dono, image)
            VALUES
            ('05e68f45-5cb2-4063-9439-326445e37367', 'Paramount Pictures', ' É um dos principais estúdios de cinema dos Estados Unidos, fundado por Adolph Zukor, em 1912, e com este nome desde 1925.', '1912-05-08', 'Skydance Media', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Paramount_Pictures_2022.svg'),
            ('2012d032-84e8-4bd6-8d08-5f544f08d63e', 'Legendary Pictures', 'É uma empresa de produção cinematográfica estadunidense, sediada em Burbank, Califórnia.', '2005-06-01', 'Wanda Group', 'https://static.wikia.nocookie.net/warner-bros-entertainment/images/3/36/Legendary_Pictures_logo.png/revision/latest?cb=20161105042657')
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            DELETE FROM estudios WHERE id = '05e68f45-5cb2-4063-9439-326445e37367';
            DELETE FROM estudios WHERE id = '2012d032-84e8-4bd6-8d08-5f544f08d63e';
            `)
    }

}
