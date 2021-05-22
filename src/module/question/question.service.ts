import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionService {
  create(): string {
    return 'question created!';
  }
}
