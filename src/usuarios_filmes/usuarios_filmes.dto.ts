import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, MaxLength, Min, ValidateNested } from "class-validator";


export class Usuarios_FilmesDTO{
    @IsUUID('4', { message: 'O campo ID deve ser um UUID'})
    @IsOptional()
    id: string;

    @IsUUID('4', { message: 'O campo usuário deve ser um UUID'})
    usuariosId: string;

    @IsUUID('4', { message: 'O campo filmes deve ser um UUID'})
    filmesId: string;

    @IsNumber({}, { message: 'O campo nota deve ser um número' })
    @Min(0.5, { message: 'O campo nota deve ser maior ou igual a 0,5' })
    @Max(5.0, { message: 'O campo nota deve ser menor ou igual a 5'})
    nota: number;

    @IsString({ message: 'O campo review deve ser do tipo string'})
    @IsNotEmpty({ message: 'O campo review é obrigatório!'})
    @MaxLength(3000, {message: 'O campo review deve ter no máximo 3.000 caracteres!'})
    @IsOptional()
    review: string;
}