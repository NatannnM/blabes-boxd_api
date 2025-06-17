import { FilmesEntity } from "src/filmes/filmes.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(() => FilmesEntity, (filmes) => filmes.usuarios)
    @JoinTable({
            name: 'usuarios_filmes',
            joinColumn: { name: 'usuarios_id'},
            inverseJoinColumn: { name: 'filmes_id' },
    })
    filmes: FilmesEntity[];
}