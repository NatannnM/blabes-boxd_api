import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuariosEntity } from "./usuarios.entity";
import { FilmesEntity } from "src/filmes/filmes.entity";
import { UsuariosController } from "./usuarios.controller";
import { UsuariosService } from "./usuarios.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UsuariosEntity,
            FilmesEntity
        ])],
    controllers: [UsuariosController],
    providers: [UsuariosService]
})

export class UsuariosModule {}