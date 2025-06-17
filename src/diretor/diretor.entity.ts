import { FilmesEntity } from "src/filmes/filmes.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'diretor' })
export class DiretorEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable:false, length: 150 })
    nome: string;

    @Column({ nullable:true })
    image: string;
  
    @Column({ nullable:false, length: 300 })
    sobre: string;

    @Column({ nullable:false})
    birthDate: Date;

    @ManyToMany(() => FilmesEntity, (filmes) => filmes.director)
    @JoinTable({
        name: 'diretor_filmes',
        joinColumn: { name: 'diretor_id'},
        inverseJoinColumn: {name: 'filmes_id'},
    })
    filmes: FilmesEntity[];

}