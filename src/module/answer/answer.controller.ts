import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

import { CreateAnswerDTO } from './dtos/CreateAnswer.dto';
import { AnswerService } from './answer.service';

@Controller()
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @EventPattern('createAnswer')
  async create(@Payload() data: CreateAnswerDTO) {
    this.answerService.create(data);
  }

  @MessagePattern('getAnswer')
  async recoverAnswer(@Payload() questionId: string) {
    return this.answerService.recoverAnswer(questionId);
  }
}
