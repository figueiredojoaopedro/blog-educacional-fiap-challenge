import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// nest > express.js > nodejs
// mongodb =>
// test > jest
// docker
// typescript
// github actions para ci/cd

// desafios tecnicos
// escolhemos mongo pq funciona melhor posts
// cada post sera um documento, cada post pode ter campos diferentes
// a flexibilidade do mongo ajuda a caracteristica da aplicacao

// servico app inicia primeiro que o mongo db
// causa problemas na conexao do servidor com o banco de dados
// solucao?
// adicionei um shell script que executa na build do servico app
// o shell script espera o banco de dados estar pronto para receber as conexoes
