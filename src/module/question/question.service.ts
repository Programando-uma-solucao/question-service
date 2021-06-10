import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CipherServiceConfig } from 'src/config/microservices.config';
import { CreateQuestionDTO } from './dtos/CreateQuestion.dto';
import { Question, QuestionDocument } from './schemas/question.schema';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @Inject(CipherServiceConfig.name)
    private readonly cipherService: ClientProxy,
  ) {}

  async create(data: CreateQuestionDTO) {
    const encrypted = await this.cipherService
      .send('encryptOne', data['question'])
      .toPromise();

    const dataToSave = {
      question: encrypted.data,
      accountId: data.accountId,
      tags: data.tags,
    };

    const createdQuestion = new this.questionModel(dataToSave);
    const savedQuestion = await createdQuestion.save();

    return savedQuestion;
  }
}
