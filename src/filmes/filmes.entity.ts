import { DiretorEntity } from "src/diretor/diretor.entity";
import { EstudiosEntity } from "src/estudios/estudios.entity";
import { GenerosEntity } from "src/generos/generos.entity";
import { UsuariosEntity } from "src/usuarios/usuarios.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'filmes'})
export class FilmesEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, length: 150})
    title: string;

    @Column({ nullable: false })
    image: string;

    @Column({ nullable: false })
    launchDate: Date;

    @ManyToMany(() => GenerosEntity, (generos) => generos.filmes)
    @JoinTable({
        name: 'filmes_generos',
        joinColumn: { name: 'filmes_id'},
        inverseJoinColumn: { name: 'generos_id' },
    })
    genre: GenerosEntity[];

    @ManyToMany(() => DiretorEntity, (diretor) => diretor.filmes)
    director: DiretorEntity[];

    @ManyToMany(() => EstudiosEntity, (estudios) => estudios.filmes)
    estudios: EstudiosEntity[];

    @ManyToMany(() => UsuariosEntity, (usuarios) => usuarios.filmes)
    usuarios: UsuariosEntity[];
}