import { ArrayNotEmpty, ArrayUnique, IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, ValidateNested } from "class-validator";
import { FilmesDto } from "src/filmes/filmes.dto";

export class UsuariosDto{
    @IsUUID('4', { message: 'O campo ID deve ser um UUID'})
    @IsOptional()
    id: string;
    
    @IsString({ message: 'O campo name deve ser do tipo string'})
    @IsNotEmpty({ message: 'O campo name é obrigatório!'})
    @MaxLength(150, {message: 'O campo name deve ter no máximo 150 caracteres!'})
    name: string;
    
    @IsString({ message: 'O campo nickname deve ser do tipo string'})
    @IsNotEmpty({ message: 'O campo nickname é obrigatório!'})
    @MaxLength(150, {message: 'O campo nickname deve ter no máximo 150 caracteres!'})
    nickname: string;

    @IsString({ message: 'O campo de photo deve ser do tipo string'})
    @IsOptional()
    photo: string;

    @IsString({ message: 'O campo de email deve ser do tipo string'})
    @IsNotEmpty({ message: 'O campo email é obrigatório!'})
    email: string;

    @IsString({ message: 'O campo address deve ser do tipo string'})
    @IsNotEmpty({ message: 'O campo address é obrigatório!'})
    @MaxLength(150, {message: 'O campo address deve ter no máximo 200 caracteres!'})
    address: string;

    @IsString({ message: 'O campo de password deve ser do tipo string'})
    @IsNotEmpty({ message: 'O campo password é obrigatório!'})
    password: string;

    @IsString({ message: 'O campo de phone deve ser do tipo string'})
    @IsNotEmpty({ message: 'O campo phone é obrigatório!'})
    phone: string;    

    @IsNotEmpty({ message: 'O campo admin é obrigatório!'})
    admin: boolean;
    
    @ValidateNested({message: 'O objeto deve ser do tipo filme'})
    @IsArray({ message: 'O campo filmes deve ser um array' })
    @IsOptional()
    filmes: FilmesDto[];
}