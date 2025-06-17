import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'generos'})
export class GenerosEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, length: 70})
    nome: string;
}