import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateQuestionDTO } from './dtos/CreateQuestion.dto';
import { QuestionService } from './question.service';

@Controller()
export class QuestionController {
  constructor(private readonly questionController: QuestionService) {}

  @MessagePattern('createQuestion')
  async create(@Payload() data: CreateQuestionDTO) {
    return this.questionController.create(data);
  }
}
