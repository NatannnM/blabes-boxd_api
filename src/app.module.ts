import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { GenerosModule } from './generos/generos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    GenerosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
