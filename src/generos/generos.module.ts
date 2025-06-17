import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GenerosEntity } from "./generos.entity";
import { GenerosController } from "./generos.controller";
import { GenerosService } from "./generos.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            GenerosEntity
        ])],
        controllers: [GenerosController],
        providers: [GenerosService]
})
export class GenerosModule {}