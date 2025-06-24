import { FilmesEntity } from "src/filmes/filmes.entity";
import { UsuariosEntity } from "src/usuarios/usuarios.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'usuarios_filmes'})
export class Usuarios_FilmesEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UsuariosEntity, (usuario) => usuario.relacao_usuario)
    usuarios: UsuariosEntity;

    @ManyToOne(() => FilmesEntity, (filmes) => filmes.relacao_filmes)
    filmes: FilmesEntity;

    @Column('decimal', {precision: 2, scale: 1})
    nota: number;

    @Column({nullable:true, length: 3000})
    review: string;
}