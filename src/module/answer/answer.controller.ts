import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateAnswerDTO } from './dtos/CreateAnswer.dto';
import { AnswerService } from './answer.service';

@Controller()
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @MessagePattern('createAnswer')
  async create(@Payload() data: CreateAnswerDTO) {
    return this.answerService.create(data);
  }
}
