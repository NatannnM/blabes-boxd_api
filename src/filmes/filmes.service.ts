import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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
        await this.validateBusinessRules(filmesDto);
        const filmes = this.filmesRepository.create(filmesDto);
        return this.filmesRepository.save(filmes);
    }
    
    async update(filmesId: string, filmesDto: FilmesDto){
        await this.validateBusinessRules(filmesDto, filmesId);
        const filmes = await this.findById(filmesId);
        Object.assign(filmes, filmesDto);
        return this.filmesRepository.save(filmes);
    }

    async remove(filmesId: string){
        const filmes = await this.findById(filmesId);
        await this.filmesRepository.remove(filmes);
        return {...filmes, filmesId};
    }

    private async validateBusinessRules(filmesDto: FilmesDto, idToIgnore?: string){
            await this.validateDiretorUnico(filmesDto.director);
            await this.validateEstudiosUnicos(filmesDto.estudios);
            await this.validateUsuariosUnicos(filmesDto.usuarios);
            await this.validateImagem(filmesDto.image);
            await this.validateDataFilmeVSNascimentoDiretor(filmesDto);
    }

    private validateDiretorUnico(diretor: {id: string}[] | undefined) {
        if (!diretor || diretor.length === 0) return;
    
        const id = diretor.map(d => d.id);
        const set = new Set(id);
    
        if (set.size !== id.length) {
          throw new BadRequestException('O filme não pode estar vinculado mais de uma vez ao mesmo diretor.');
        }
    }

    private validateEstudiosUnicos(estudios: {id: string}[] | undefined) {
        if (!estudios || estudios.length === 0) return;
    
        const id = estudios.map(e => e.id);
        const set = new Set(id);
    
        if (set.size !== id.length) {
          throw new BadRequestException('O filme não pode estar vinculado mais de uma vez ao mesmo Estúdio.');
        }
    }

    private validateUsuariosUnicos(usuarios: {id: string}[] | undefined) {
        if (!usuarios || usuarios.length === 0) return;
    
        const id = usuarios.map(u => u.id);
        const set = new Set(id);
    
        if (set.size !== id.length) {
          throw new BadRequestException('O filme não pode estar vinculado mais de uma vez ao mesmo usuário.');
        }
    }

    private validateImagem(image: string){
        const url= /^https?:\/\/.+/i;
        if (!url.test(image)) {
            throw new BadRequestException('A imagem do filme deve ter uma URL válida.');
        }
    }

    private validateDataFilmeVSNascimentoDiretor(filmeDto: FilmesDto) {
        const launchDate = new Date(filmeDto.launchDate);
    
        for (const diretor of filmeDto.director) {
          const birthDate = new Date(diretor.birthDate);
          if (birthDate > launchDate) {
            throw new BadRequestException(
              `A data de nascimento do diretor ${diretor.nome} (${birthDate.toLocaleDateString()}) não pode ser posterior à data de lançamento do filme (${launchDate.toLocaleDateString()}).`
            );
          }
        }
    }


}