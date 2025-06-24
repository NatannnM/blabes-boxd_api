import { Usuarios_FilmesEntity } from "src/usuarios_filmes/usuarios_filmes.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'usuarios'})
export class UsuariosEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable:false, length: 150})
    name: string;

    @Column({nullable:false, length: 150})
    nickname: string;

    @Column({nullable:false})
    photo: string;

    @Column({nullable:false})
    email: string;

    @Column({nullable:false, length: 200})
    address: string;

    @Column({nullable:false})
    password: string;

    @Column({nullable:false})
    phone: string;

    @Column({nullable:false})
    admin: boolean;

    @OneToMany(() => Usuarios_FilmesEntity, (uf) => uf.usuarios)
    relacao_usuario: Usuarios_FilmesEntity
}