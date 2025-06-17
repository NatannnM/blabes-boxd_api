import { ArrayNotEmpty, IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, ValidateNested } from "class-validator";
import { DiretorDto } from "src/diretor/diretor.dto";
import { EstudiosDto } from "src/estudios/estudios.dto";
import { GenerosDto } from "src/generos/generos.dto";
import { UsuariosDto } from "src/usuarios/usuarios.dto";

export class FilmesDto{
    @IsUUID('4', { message: 'O campo ID deve ser um UUID'})
    @IsOptional()
    id: string;

    @IsString({ message: 'O campo título deve ser do tipo string'})
    @IsNotEmpty({ message: 'O campo título é obrigatório!'})
    @MaxLength(150, {message: 'O campo título deve ter no máximo 150 caracteres!'})
    title: string;

    @IsString({ message: 'O campo de imagem deve ser do tipo string'})
    @IsOptional()
    image: string;

    @IsDateString({}, { message: 'O campo launchDate deve ter uma data válida'})
    launchDate: string;

    @ArrayNotEmpty({ message: 'O campo genre não pode ser vazio' })
    @ValidateNested({message: 'O objeto deve ser do tipo genre'})
    @IsArray({ message: 'O campo genre deve ser um array' })
    genre: GenerosDto[];

    @ArrayNotEmpty({ message: 'O campo director não pode ser vazio' })
    @ValidateNested({message: 'O objeto deve ser do tipo director' })
    @IsArray({ message: 'O campo director deve ser um array' })
    director: DiretorDto[];
    
    @ArrayNotEmpty({ message: 'O campo estudios não pode ser vazio' })
    @ValidateNested({message: 'O objeto deve ser do tipo estudios' })
    @IsArray({ message: 'O campo estudios deve ser um array' })
    estudios: EstudiosDto[];

    @ValidateNested({message: 'O objeto deve ser do tipo usuarios' })
    @IsArray({ message: 'O campo usuarios deve ser um array' })
    @IsOptional()
    usuarios: UsuariosDto[];
}