import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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
        await this.validateBusinessRules(diretorDto);
        const diretor = this.diretorRepository.create(diretorDto);
        return this.diretorRepository.save(diretor);
    }
    
    async update(diretorId: string, diretorDto: DiretorDto){
        await this.validateBusinessRules(diretorDto, diretorId);
        const diretor = await this.findById(diretorId);
        Object.assign(diretor, diretorDto);
        return this.diretorRepository.save(diretor);
    }

    async remove(diretorId: string){
        await this.validateRemoveDiretor(diretorId);
        const diretor = await this.findById(diretorId);
        await this.diretorRepository.remove(diretor);
        return {...diretor, diretorId};
    }

    private async validateBusinessRules(diretorDto: DiretorDto, idToIgnore?: string){
            await this.validateDateDiretor(diretorDto);
            await this.validateFilmesUnicos(diretorDto.filmes);
    }

    private async validateDateDiretor(diretorDto: DiretorDto){
        if (new Date(diretorDto.birthDate) > new Date()) {
            throw new BadRequestException('A data de nascimento do diretor não pode ser futura.');
        }
    }

    private async validateRemoveDiretor(diretorId: string){
        const diretor = await this.diretorRepository.findOne({
            where: { id: diretorId },
            relations: ['filmes']
        });
        if(diretor?.filmes && diretor.filmes.length > 0){
            throw new BadRequestException('Não é possível excluir um diretor associado a algum filme.');
        }
    }

    private validateFilmesUnicos(filmes: {id: string}[] | undefined) {
    if (!filmes || filmes.length === 0) return;

    const id = filmes.map(f => f.id);
    const set = new Set(id);

    if (set.size !== id.length) {
      throw new BadRequestException('O diretor não pode estar vinculado mais de uma vez ao mesmo filme.');
    }
    }
}