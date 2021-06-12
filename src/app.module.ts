import { ClientsModule } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CipherServiceConfig } from './config/microservices.config';
import {
  Question,
  QuestionSchema,
} from './module/question/schemas/question.schema';
import { QuestionController } from './module/question/question.controller';
import { QuestionService } from './module/question/question.service';

@Module({
  imports: [
    ClientsModule.register([CipherServiceConfig]),
    MongooseModule.forRoot('mongodb://localhost/question-service'),
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
