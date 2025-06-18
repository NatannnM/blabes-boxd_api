import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GenerosEntity } from "./generos.entity";
import { Repository } from "typeorm";
import { GenerosDto } from "./generos.dto";

@Injectable()
export class GenerosService {
    constructor(
        @InjectRepository(GenerosEntity)
        private generosRepository: Repository<GenerosEntity>,
    ) {}

    findAll() {
        return this.generosRepository.find();
    }

    async create(generosDto: GenerosDto){
        await this.validateBusinessRules(generosDto);
        const generosEntity = this.generosRepository.create(generosDto);
        return this.generosRepository.save(generosEntity);
    }

    async update(generosId: string, generosDto: GenerosDto){
        await this.validateBusinessRules(generosDto, generosId);
        return this.generosRepository.save({
            ...generosDto,
            id: generosId,
        });
    }

    async findById(generosId: string){
        const find = await this.generosRepository.findOne({
            where: {id: generosId},
        });
        if(find === null){
            throw new NotFoundException(
                'Generos com Id ' + generosId + ' não encontrados!',
            );
        }
        return find;
    }

    async remove(generosId: string){
        await this.validateRemoveGenero(generosId);
        const generos = await this.findById(generosId);
        await this.generosRepository.remove(generos);
        return {...generos, id: generosId};
    }

    private async validateBusinessRules(generosDto: GenerosDto, idToIgnore?: string){
        await this.validateNomeGenero(generosDto, idToIgnore);

    }

    private async validateNomeGenero(generosDto: GenerosDto, idToIgnore: string | undefined){
        const existe = await this.generosRepository.findOne({
            where: { nome: generosDto.nome},
        });
        if(existe && existe.id !== idToIgnore){
            throw new BadRequestException('Já existe um gênero com esse nome!');
        }
    }

    private async validateRemoveGenero(generosId: string){
        const genero = await this.generosRepository.findOne({
            where: { id: generosId },
            relations: ['filmes']
        });
        if(genero?.filmes && genero.filmes.length > 0){
            throw new BadRequestException('Não é possível excluir um gênero associado a algum filme.');
        }
    }
}