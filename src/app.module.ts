import { Module } from '@nestjs/common';
import { QuestionController } from './module/question/question.controller';
import { QuestionService } from './module/question/question.service';
// import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // imports: [MongooseModule.forRoot('mongodb://localhost/account-service')],
  imports: [],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class AppModule {}
