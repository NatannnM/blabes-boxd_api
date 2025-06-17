import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, ValidateNested } from "class-validator";
import { FilmesDto } from "src/filmes/filmes.dto";

export class DiretorDto{
    @IsUUID('4', { message: 'O campo ID deve ser um UUID'})
    @IsOptional()
    id: string;

    @IsString({ message: 'O campo nome deve ser do tipo string'})
    @IsNotEmpty({ message: 'O campo nome é obrigatório!'})
    @MaxLength(150, {message: 'O campo nome deve ter no máximo 150 caracteres!'})
    nome: string;

    @IsString({ message: 'O campo de imagem deve ser do tipo string'})
    @IsOptional()
    image: string;

    @IsString({ message: 'O campo sobre deve ser do tipo string'})
    @IsNotEmpty({ message: 'O campo sobre é obrigatório!'})
    @MaxLength(300, {message: 'O campo sobre deve ter no máximo 300 caracteres!'})
    sobre: string;

    @IsDateString({}, { message: 'O campo birthDate deve ter uma data válida'})
    birthDate: string;

    @ValidateNested({message: 'O objeto deve ser do tipo filme'})
    @IsArray({ message: 'O campo filmes deve ser um array' })
    @IsOptional()
    filmes: FilmesDto[];
}