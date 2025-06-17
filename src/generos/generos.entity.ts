import { FilmesEntity } from "src/filmes/filmes.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'generos'})
export class GenerosEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, length: 70})
    nome: string;

    @ManyToMany(() => FilmesEntity, (filmes) => filmes.genre)
    filmes: FilmesEntity[];
}