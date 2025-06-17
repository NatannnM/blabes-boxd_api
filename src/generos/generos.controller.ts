import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { GenerosService } from "./generos.service";
import { GenerosDto } from "./generos.dto";

@Controller('generos')
export class GenerosController {
    constructor(private generosService: GenerosService) {}

    @Get()
    findAll(){
        return this.generosService.findAll();
    }

    @Post()
    @HttpCode(201)
    create(@Body() generosDto: GenerosDto){
        return this.generosService.create(generosDto);
    }

    @Put(':id')
    update(@Body() generosDto: GenerosDto, @Param('id') generosId: string){
        return this.generosService.update(generosId, generosDto);
    }

    @Get(':id')
    findById(@Param('id') generosId: string){
        return this.generosService.findById(generosId);
    }

    @Delete(':id')
    remove(@Param('id') generosId: string){
        return this.generosService.remove(generosId);
    }

}