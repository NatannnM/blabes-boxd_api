import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { GenerosModule } from './generos/generos.module';
import { FilmesModule } from './filmes/filmes.module';
import { DiretorModule } from './diretor/diretor.module';
import { EstudiosModule } from './estudios/estudios.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    GenerosModule,
    FilmesModule,
    DiretorModule,
    EstudiosModule,
    UsuariosModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
