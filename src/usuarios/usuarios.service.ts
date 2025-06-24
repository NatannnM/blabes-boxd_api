import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuariosEntity } from "./usuarios.entity";
import { Repository } from "typeorm";
import { UsuariosDto } from "./usuarios.dto";

@Injectable()
export class UsuariosService{
    constructor(
        @InjectRepository(UsuariosEntity)
        private usuariosRepository: Repository<UsuariosEntity>
    ){}

    async findAll(){
        return await this.usuariosRepository.find({ relations: ['relacao_usuario']});
    }

    async findById(id: string){
        const usuarios = await this.usuariosRepository.findOne({
            where: { id },
            relations: ['relacao_usuario'],
        });
        if(!usuarios) throw new NotFoundException('relacao_usuario');
        return usuarios;
    }

    async findByEmail(email: string) {
        return this.usuariosRepository.findOne({ where: { email } });
    }

    async create(usuariosDto: UsuariosDto){
        await this.validateBusinessRules(usuariosDto);
        const usuarios = this.usuariosRepository.create(usuariosDto);
        return this.usuariosRepository.save(usuarios);
    }
    
    async update(usuariosId: string, usuariosDto: UsuariosDto){
        await this.validateBusinessRules(usuariosDto, usuariosId);
        const usuarios = await this.findById(usuariosId);
        Object.assign(usuarios, usuariosDto);
        return this.usuariosRepository.save(usuarios);
    }

    async remove(usuariosId: string){
        const usuarios = await this.findById(usuariosId);
        await this.usuariosRepository.remove(usuarios);
        return {...usuarios, usuariosId};
    }

    private async validateBusinessRules(usuariosDto: UsuariosDto, idToIgnore?: string){
        await this.validateNicknameUsuarios(usuariosDto, idToIgnore);
        await this.validateEmail(usuariosDto.email);
        await this.validateNumero(usuariosDto.phone);
    }
    
    private async validateNicknameUsuarios(usuariosDto: UsuariosDto, idToIgnore: string | undefined){
        const existe = await this.usuariosRepository.findOne({
            where: { nickname: usuariosDto.nickname},
        });
        if(existe && existe.id !== idToIgnore){
            throw new BadRequestException('Já existe um usuário com esse nickname!');
        }
    }

    private validateEmail(email: string) {
        const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailTest.test(email)) {
            throw new BadRequestException('O e-mail informado é inválido.');
        }
    }

    private validateNumero(phone: string) {
        const numeroLimpo = phone.replace(/\D/g, '');

        if (numeroLimpo.length > 11) {
            throw new BadRequestException('O número de telefone deve ter no máximo 11 dígitos.');
        }
    }
}