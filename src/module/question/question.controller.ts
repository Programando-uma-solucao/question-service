import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateQuestionDTO } from './dtos/CreateQuestion.dto';
import { RecoverQuestionsDTO } from './dtos/RecoverQuestions.dto';
import { QuestionService } from './question.service';

@Controller()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @MessagePattern('createQuestion')
  async create(@Payload() data: CreateQuestionDTO) {
    return this.questionService.create(data);
  }

  @MessagePattern('recoverQuestions')
  async recoverQuestions(@Payload() data: RecoverQuestionsDTO) {
    return this.questionService.recoverQuestions(data);
  }
}
