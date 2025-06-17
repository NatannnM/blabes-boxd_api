import { Injectable, NotFoundException } from "@nestjs/common";
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

    create(generosDto: GenerosDto){
        const generosEntity = this.generosRepository.create(generosDto);
        return this.generosRepository.save(generosEntity);
    }

    update(generosId: string, generosDto: GenerosDto){
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
        const generos = await this.findById(generosId);

        await this.generosRepository.remove(generos);
        return {...generos, id: generosId};
    }
}