import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { DiretorService } from "./diretor.service";
import { DiretorDto } from "./diretor.dto";

@Controller('diretor')
export class DiretorController{
    constructor(private diretorService: DiretorService) {}

    @Get()
    findAll(){
        return this.diretorService.findAll();
    }

    @Get(':id')
    findById(@Param('id') diretorId: string) {
        return this.diretorService.findById(diretorId);
    }

    @Post()
    @HttpCode(201)
    create(@Body() diretorDto: DiretorDto) {
      return this.diretorService.create(diretorDto);
    }

    @Put(':id')
    update(@Param('id') diretorId: string, @Body() diretorDto: DiretorDto) {
      return this.diretorService.update(diretorId, diretorDto);
    }

    @Delete(':id')
    remove(@Param('id') diretorId: string) {
      return this.diretorService.remove(diretorId);
    }
}