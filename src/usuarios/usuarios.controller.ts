import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";
import { UsuariosDto } from "./usuarios.dto";

@Controller('usuarios')
export class UsuariosController{
    constructor(private usuariosService: UsuariosService){}

    @Get()
    findAll(){
        return this.usuariosService.findAll();
    }

    @Get(':id')
    findById(@Param('id') usuariosId: string) {
        return this.usuariosService.findById(usuariosId);
    }

    @Post()
    @HttpCode(201)
    create(@Body() usuariosDto: UsuariosDto) {
      return this.usuariosService.create(usuariosDto);
    }

    @Put(':id')
    update(@Param('id') usuariosId: string, @Body() usuariosDto: UsuariosDto) {
      return this.usuariosService.update(usuariosId, usuariosDto);
    }

    @Delete(':id')
    remove(@Param('id') usuariosId: string) {
      return this.usuariosService.remove(usuariosId);
    }
}