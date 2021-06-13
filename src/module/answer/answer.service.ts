import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CipherServiceConfig } from 'src/config/microservices.config';
import { CreateAnswerDTO } from './dtos/CreateAnswer.dto';
import { Answer, AnswerDocument } from './schemas/answer.schema';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
    @Inject(CipherServiceConfig.name)
    private readonly cipherService: ClientProxy,
  ) {}

  async create(data: CreateAnswerDTO) {
    const encrypted = await this.cipherService
      .send('encryptOne', data['answer'])
      .toPromise();

    const dataToSave = {
      answer: encrypted.data,
      accountId: data.accountId,
      questionId: data.questionId,
    };

    const createdAnswer = new this.answerModel(dataToSave);
    const savedAnswer = await createdAnswer.save();

    return savedAnswer;
  }
}
