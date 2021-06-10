import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { QuestionModule } from './app.module';

(async function bootstrap() {
  const app = await NestFactory.createMicroservice(QuestionModule, {
    transport: Transport.TCP,
    options: { host: 'localhost', port: 8084 },
  });
  app.useGlobalPipes(new ValidationPipe());
  app.listen(() => console.log('question-service is listening on port 8084'));
})();
