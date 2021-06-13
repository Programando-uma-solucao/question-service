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
import { Answer, AnswerSchema } from './module/answer/schemas/answer.schema';
import { AnswerController } from './module/answer/answer.controller';
import { AnswerService } from './module/answer/answer.service';

@Module({
  imports: [
    ClientsModule.register([CipherServiceConfig]),
    MongooseModule.forRoot('mongodb://localhost/question-service'),
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      { name: Answer.name, schema: AnswerSchema },
    ]),
  ],
  controllers: [QuestionController, AnswerController],
  providers: [QuestionService, AnswerService],
})
export class QuestionModule {}
