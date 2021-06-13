import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CipherServiceConfig } from 'src/config/microservices.config';
import { Question, QuestionDocument } from '../question/schemas/question.schema';
import { CreateAnswerDTO } from './dtos/CreateAnswer.dto';
import { Answer, AnswerDocument } from './schemas/answer.schema';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
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
    await this.questionModel.updateOne({ _id : data.questionId },{ hasResponse : true });
    const savedAnswer = await createdAnswer.save();

    return savedAnswer;
  }
}
