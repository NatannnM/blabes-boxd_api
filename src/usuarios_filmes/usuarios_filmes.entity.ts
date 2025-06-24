import { FilmesEntity } from "src/filmes/filmes.entity";
import { UsuariosEntity } from "src/usuarios/usuarios.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'usuarios_filmes'})
export class Usuarios_FilmesEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UsuariosEntity, (usuario) => usuario.filmes)
    usuarios: UsuariosEntity;

    @ManyToOne(() => FilmesEntity, (filmes) => filmes.usuarios)
    filmes: FilmesEntity;

    @Column('decimal', {precision: 2, scale: 1})
    nota: number;
}