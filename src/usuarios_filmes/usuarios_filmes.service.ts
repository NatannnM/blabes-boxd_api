import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuarios_FilmesEntity } from "./usuarios_filmes.entity";
import { Repository } from "typeorm";
import { UsuariosEntity } from "src/usuarios/usuarios.entity";
import { FilmesEntity } from "src/filmes/filmes.entity";
import { Usuarios_FilmesDTO } from "./usuarios_filmes.dto";

@Injectable()
export class Usuarios_FilmesService{
    constructor(
        @InjectRepository(Usuarios_FilmesEntity)
        private usuarios_filmesRepository: Repository<Usuarios_FilmesEntity>
    ){}

    async findAll(){
        return await this.usuarios_filmesRepository.find({ relations: ['usuarios', 'filmes']});
    }

    async findById(id: string){
        const usuarios_filmes = await this.usuarios_filmesRepository.findOne({
            where: { id },
            relations: ['usuarios', 'filmes'],
        });
        if(!usuarios_filmes) throw new NotFoundException('Usuário_filmes não encontrado');
        return usuarios_filmes;
    }

    async findByIdUsuario(usuarioId: string){
        const usuarios_filmes = await this.usuarios_filmesRepository.find({
            where: { usuarios: {id: usuarioId} },
            relations: ['usuarios', 'filmes'],
        });
        if(!usuarios_filmes) throw new NotFoundException('Usuário não encontrado');
        return usuarios_filmes;
    }

    async findByIdFilme(filmeId: string){
        const usuarios_filmes = await this.usuarios_filmesRepository.find({
            where: { filmes: {id: filmeId} },
            relations: ['usuarios', 'filmes'],
        });
        if(!usuarios_filmes) throw new NotFoundException('Filme não encontrado');
        return usuarios_filmes;
    }

    async create(usuarios_filmesDto: Usuarios_FilmesDTO){
        const usuarios_filmes = this.usuarios_filmesRepository.create({
            usuarios:{id: usuarios_filmesDto.usuariosId},
            filmes: {id: usuarios_filmesDto.filmesId},
            nota: usuarios_filmesDto.nota,
            review: usuarios_filmesDto.review
        });
        return this.usuarios_filmesRepository.save(usuarios_filmes);
    }
    
    async update(usuarios_filmesId: string, usuarios_filmesDto: Usuarios_FilmesDTO){
        const usuarios_filmes = await this.findById(usuarios_filmesId);
        
        usuarios_filmes.usuarios = { id: usuarios_filmesDto.usuariosId } as UsuariosEntity;
        usuarios_filmes.filmes = { id: usuarios_filmesDto.filmesId } as FilmesEntity;
        usuarios_filmes.nota = usuarios_filmesDto.nota;
        usuarios_filmes.review = usuarios_filmesDto.review;

        return this.usuarios_filmesRepository.save(usuarios_filmes);
    }

    async remove(usuarios_filmesId: string){
        const usuarios_filmes = await this.findById(usuarios_filmesId);
        await this.usuarios_filmesRepository.remove(usuarios_filmes);
        return {...usuarios_filmes, usuarios_filmesId};
    }

    
}