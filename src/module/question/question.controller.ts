import { Controller } from '@nestjs/common';
import { QuestionService } from './question.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class QuestionController {
  constructor(private readonly questionController: QuestionService) {}

  @MessagePattern('create')
  create(): string {
    return this.questionController.create();
  }
}
