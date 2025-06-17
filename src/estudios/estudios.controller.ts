import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { EstudiosService } from "./estudios.service";
import { EstudiosDto } from "./estudios.dto";

@Controller('estudios')
export class EstudiosController{
    constructor(private estudiosService: EstudiosService){}

    @Get()
    findAll(){
        return this.estudiosService.findAll();
    }

    @Get(':id')
    findById(@Param('id') estudiosId: string) {
        return this.estudiosService.findById(estudiosId);
    }

    @Post()
    @HttpCode(201)
    create(@Body() estudiosDto: EstudiosDto) {
      return this.estudiosService.create(estudiosDto);
    }

    @Put(':id')
    update(@Param('id') estudiosId: string, @Body() estudiosDto: EstudiosDto) {
      return this.estudiosService.update(estudiosId, estudiosDto);
    }

    @Delete(':id')
    remove(@Param('id') estudiosId: string) {
      return this.estudiosService.remove(estudiosId);
    }
}