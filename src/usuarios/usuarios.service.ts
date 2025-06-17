import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuariosEntity } from "./usuarios.entity";
import { Repository } from "typeorm";
import { FilmesEntity } from "src/filmes/filmes.entity";
import { UsuariosDto } from "./usuarios.dto";

@Injectable()
export class UsuariosService{
    constructor(
        @InjectRepository(UsuariosEntity)
        private usuariosRepository: Repository<UsuariosEntity>,
        @InjectRepository(FilmesEntity)
        private filmesRepository: Repository<FilmesEntity>,
    ){}

    async findAll(){
        return await this.usuariosRepository.find({ relations: ['filmes']});
    }

    async findById(id: string){
        const usuarios = await this.usuariosRepository.findOne({
            where: { id },
            relations: ['filmes'],
        });
        if(!usuarios) throw new NotFoundException('Usuário não encontrado');
        return usuarios;
    }

    async create(usuariosDto: UsuariosDto){
        const usuarios = this.usuariosRepository.create(usuariosDto);
        return this.usuariosRepository.save(usuarios);
    }
    
    async update(usuariosId: string, usuariosDto: UsuariosDto){
        const usuarios = await this.findById(usuariosId);
        Object.assign(usuarios, usuariosDto);
        return this.usuariosRepository.save(usuarios);
    }

    async remove(usuariosId: string){
        const usuarios = await this.findById(usuariosId);
        await this.usuariosRepository.remove(usuarios);
        return {...usuarios, usuariosId};
    }

}