import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'filmes'})
export class FilmesEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    image: string;

    @Column({ nullable: false })
    launchDate: Date;

    @Column({ nullable: false })
    genre: string;

    @Column({ nullable: true })
    director: string

    @Column({ nullable: true })
    estudios: string
}