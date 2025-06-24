import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuarios_FilmesEntity } from "./usuarios_filmes.entity";
import { FilmesEntity } from "src/filmes/filmes.entity";
import { UsuariosEntity } from "src/usuarios/usuarios.entity";
import { Usuarios_FilmesController } from "./usuarios_filmes.controller";
import { Usuarios_FilmesService } from "./usuarios_filmes.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Usuarios_FilmesEntity,
            UsuariosEntity,
            FilmesEntity,
        ])],
        controllers: [Usuarios_FilmesController],
        providers: [Usuarios_FilmesService],
})

export class Usuarios_FilmesModule {}