import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EstudiosEntity } from "./estudios.entity";
import { FilmesEntity } from "src/filmes/filmes.entity";
import { EstudiosController } from "./estudios.controller";
import { EstudiosService } from "./estudios.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            EstudiosEntity,
            FilmesEntity
        ])],
    controllers: [EstudiosController],
    providers: [EstudiosService]
})

export class EstudiosModule {}