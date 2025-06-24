import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuariosEntity } from "./usuarios.entity";
import { UsuariosController } from "./usuarios.controller";
import { UsuariosService } from "./usuarios.service";
import { Usuarios_FilmesEntity } from "src/usuarios_filmes/usuarios_filmes.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UsuariosEntity,
            Usuarios_FilmesEntity,
        ])],
    controllers: [UsuariosController],
    providers: [UsuariosService],
    exports: [UsuariosService]
})

export class UsuariosModule {}