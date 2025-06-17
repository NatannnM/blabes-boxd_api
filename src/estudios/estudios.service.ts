import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EstudiosEntity } from "./estudios.entity";
import { Repository } from "typeorm";
import { FilmesEntity } from "src/filmes/filmes.entity";
import { EstudiosDto } from "./estudios.dto";

@Injectable()
export class EstudiosService{
    constructor(
        @InjectRepository(EstudiosEntity)
        private estudiosRepository: Repository<EstudiosEntity>,
        @InjectRepository(FilmesEntity)
        private filmesRepository: Repository<FilmesEntity>,
    ){}

    async findAll(){
        return await this.estudiosRepository.find({ relations: ['filmes']});
    }

    async findById(id: string){
        const estudios = await this.estudiosRepository.findOne({
            where: { id },
            relations: ['filmes'],
        });
        if(!estudios) throw new NotFoundException('Estúdio não encontrado');
        return estudios;
    }

    async create(estudiosDto: EstudiosDto){
        const estudios = this.estudiosRepository.create(estudiosDto);
        return this.estudiosRepository.save(estudios);
    }
    
    async update(estudiosId: string, estudiosDto: EstudiosDto){
        const estudios = await this.findById(estudiosId);
        Object.assign(estudios, estudiosDto);
        return this.estudiosRepository.save(estudios);
    }

    async remove(estudiosId: string){
        const estudios = await this.findById(estudiosId);
        await this.estudiosRepository.remove(estudios);
        return {...estudios, estudiosId};
    }

}