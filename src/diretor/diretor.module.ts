import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilmesEntity } from "src/filmes/filmes.entity";
import { DiretorEntity } from "./diretor.entity";
import { DiretorController } from "./diretor.controller";
import { DiretorService } from "./diretor.service";

@Module({ 
    imports: [
        TypeOrmModule.forFeature([
            DiretorEntity,
            FilmesEntity
        ])],
    controllers: [DiretorController],
    providers: [DiretorService]
})

export class DiretorModule {}