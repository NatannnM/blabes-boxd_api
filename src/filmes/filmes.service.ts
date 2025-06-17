import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilmesEntity } from "./filmes.entity";
import { Repository } from "typeorm";
import { GenerosEntity } from "src/generos/generos.entity";
import { FilmesDto } from "./filmes.dto";

@Injectable()
export class FilmesService {
    constructor(
        @InjectRepository(FilmesEntity)
        private filmesRepository: Repository<FilmesEntity>,
        @InjectRepository(GenerosEntity)
        private generosRepository: Repository<GenerosEntity>
    ){}

    async findAll(){
        return await this.filmesRepository.find({ relations: ['genre', 'director', 'estudios', 'usuarios']});
    }

    async findById(id: string){
        const filmes = await this.filmesRepository.findOne({
            where: { id },
            relations: ['genre', 'director', 'estudios', 'usuarios'],
        });
        if(!filmes) throw new NotFoundException('Filme não encontrado');
        return filmes;
    }

    async create(filmesDto: FilmesDto){
        const filmes = this.filmesRepository.create(filmesDto);
        return this.filmesRepository.save(filmes);
    }
    
    async update(filmesId: string, filmesDto: FilmesDto){
        const filmes = await this.findById(filmesId);
        Object.assign(filmes, filmesDto);
        return this.filmesRepository.save(filmes);
    }

    async remove(filmesId: string){
        const filmes = await this.findById(filmesId);
        await this.filmesRepository.remove(filmes);
        return {...filmes, filmesId};
    }
}