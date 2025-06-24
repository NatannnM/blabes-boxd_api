import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { Usuarios_FilmesService } from "./usuarios_filmes.service";
import { Usuarios_FilmesDTO } from "./usuarios_filmes.dto";

@Controller('usuarios_filmes')
export class Usuarios_FilmesController{
    constructor(private usuarios_filmesService: Usuarios_FilmesService){}

    @Get()
    findAll(){
        return this.usuarios_filmesService.findAll();
    }

    @Get(':id')
    findById(@Param('id') usuarios_filmesId: string) {
        return this.usuarios_filmesService.findById(usuarios_filmesId);
    }

    @Get('usuarios/:id')
    findByIdUsuario(@Param('id') usuarioId: string) {
        return this.usuarios_filmesService.findByIdUsuario(usuarioId);
    }

    @Get('filmes/:id')
    findByIdFilme(@Param('id') filmeId: string) {
        return this.usuarios_filmesService.findByIdFilme(filmeId);
    }

    @Post()
    @HttpCode(201)
    create(@Body() usuarios_filmesDto: Usuarios_FilmesDTO) {
      return this.usuarios_filmesService.create(usuarios_filmesDto);
    }

    @Put(':id')
    update(@Param('id') usuarios_filmesId: string, @Body() usuarios_filmesDto: Usuarios_FilmesDTO) {
      return this.usuarios_filmesService.update(usuarios_filmesId, usuarios_filmesDto);
    }

    @Delete(':id')
    remove(@Param('id') usuarios_filmesId: string) {
      return this.usuarios_filmesService.remove(usuarios_filmesId);
    }
}