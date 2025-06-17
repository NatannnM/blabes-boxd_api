import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilmesEntity } from "./filmes.entity";
import { GenerosEntity } from "src/generos/generos.entity";
import { FilmesController } from "./filmes.controller";
import { FilmesService } from "./filmes.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FilmesEntity,
            GenerosEntity
        ])],
    controllers: [FilmesController],
    providers: [FilmesService]
})

export class FilmesModule {}