import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class GenerosDto {
    @IsUUID('4', { message: 'O campo ID deve ser um UUID'})
    @IsOptional()
    id: string;

    @IsString({ message: 'O campo nome deve ser do tipo string'})
    @IsNotEmpty({ message: 'O campo nome é obrigatório!'})
    @MaxLength(70, {message: 'O campo nome deve ter no máximo 70 caracteres!'})
    nome: string;
}