import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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
        await this.validateBusinessRules(estudiosDto);
        const estudios = this.estudiosRepository.create(estudiosDto);
        return this.estudiosRepository.save(estudios);
    }
    
    async update(estudiosId: string, estudiosDto: EstudiosDto){
        await this.validateBusinessRules(estudiosDto, estudiosId);
        const estudios = await this.findById(estudiosId);
        Object.assign(estudios, estudiosDto);
        return this.estudiosRepository.save(estudios);
    }

    async remove(estudiosId: string){
        await this.validateRemoveEstudios(estudiosId);
        const estudios = await this.findById(estudiosId);
        await this.estudiosRepository.remove(estudios);
        return {...estudios, estudiosId};
    }

    private async validateBusinessRules(estudiosDto: EstudiosDto, idToIgnore?: string){
                await this.validateDateEstudios(estudiosDto);
                await this.validateSobreMinimo(estudiosDto);
        }
    
    private async validateDateEstudios(estudiosDto: EstudiosDto){
        if (new Date(estudiosDto.launchDate) > new Date()) {
            throw new BadRequestException('A data de lançamento do estúdio não pode ser futura.');
        }
    }

    private validateSobreMinimo(estudioDto: EstudiosDto) {
      const sobre = estudioDto.sobre?.trim();
      if (!sobre || sobre.length < 30) {
        throw new BadRequestException('O campo sobre deve conter pelo menos 30 caracteres.');
      }
    }

    private async validateRemoveEstudios(estudiosId: string){
        const estudios = await this.estudiosRepository.findOne({
            where: { id: estudiosId },
            relations: ['filmes']
        });
        if(estudios?.filmes && estudios.filmes.length > 0){
            throw new BadRequestException('Não é possível excluir um Estúdio associado a algum filme.');
        }
    }

}