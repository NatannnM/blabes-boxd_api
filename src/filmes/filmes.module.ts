import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilmesEntity } from "./filmes.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FilmesEntity
        ])],
})

export class FilmesModule {}