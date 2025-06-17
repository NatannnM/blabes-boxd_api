import { FilmesEntity } from "src/filmes/filmes.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'estudios'})
export class EstudiosEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable:false, length: 150 })
    nome: string;

    @Column({ nullable:false, length: 300 })
    sobre: string;

    @Column({ nullable:false })
    launchDate: Date;

    @Column({ nullable:false, length: 150 })
    dono: String;

    @Column({ nullable:true })
    image: string;

    @ManyToMany(() => FilmesEntity, (filmes) => filmes.estudios)
    @JoinTable({
            name: 'estudios_filmes',
            joinColumn: { name: 'estudios_id'},
            inverseJoinColumn: { name: 'filmes_id' },
    })
    filmes: FilmesEntity[];
}