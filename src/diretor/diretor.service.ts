import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DiretorEntity } from "./diretor.entity";
import { Repository } from "typeorm";
import { FilmesEntity } from "src/filmes/filmes.entity";
import { DiretorDto } from "./diretor.dto";

@Injectable()
export class DiretorService{
    constructor(
        @InjectRepository(DiretorEntity)
        private diretorRepository: Repository<DiretorEntity>,
        @InjectRepository(FilmesEntity)
        private filmesRepository: Repository<FilmesEntity>,
    ){}

    async findAll(){
        return await this.diretorRepository.find({ relations: ['filmes']});
    }

    async findById(id: string){
        const diretor = await this.diretorRepository.findOne({
            where: { id },
            relations: ['filmes'],
        });
        if(!diretor) throw new NotFoundException('Diretor não encontrado');
        return diretor;
    }

    async create(diretorDto: DiretorDto){
        const diretor = this.diretorRepository.create(diretorDto);
        return this.diretorRepository.save(diretor);
    }
    
    async update(diretorId: string, diretorDto: DiretorDto){
        const diretor = await this.findById(diretorId);
        Object.assign(diretor, diretorDto);
        return this.diretorRepository.save(diretor);
    }

    async remove(diretorId: string){
        const diretor = await this.findById(diretorId);
        await this.diretorRepository.remove(diretor);
        return {...diretor, diretorId};
    }
}