import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { FilmesService } from "./filmes.service";
import { FilmesDto } from "./filmes.dto";

@Controller('filmes')
export class FilmesController {
    constructor(private filmesService: FilmesService) {}

    @Get()
    findAll(){
        return this.filmesService.findAll();
    }

    @Get(':id')
    findById(@Param('id') filmesId: string) {
        return this.filmesService.findById(filmesId);
    }

    @Post()
    @HttpCode(201)
    create(@Body() filmesDto: FilmesDto) {
      return this.filmesService.create(filmesDto);
    }

    @Put(':id')
    update(@Param('id') FilmesId: string, @Body() filmesDto: FilmesDto) {
      return this.filmesService.update(FilmesId, filmesDto);
    }

    @Delete(':id')
    remove(@Param('id') filmesId: string) {
      return this.filmesService.remove(filmesId);
    }
}