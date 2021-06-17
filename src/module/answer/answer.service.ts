import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CipherServiceConfig } from 'src/config/microservices.config';
import {
  Question,
  QuestionDocument,
} from '../question/schemas/question.schema';
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
    const responseAlreadyExists = await this.answerModel.findOne({
      question: data.questionId,
    });

    if (responseAlreadyExists)
      throw new RpcException({
        httpCode: 400,
        message: 'There is already an answer to this question',
      });

    const encrypted = await this.cipherService
      .send('encryptOne', data.answer)
      .toPromise();

    const dataToSave = {
      answer: encrypted.data,
      lawyerId: data.lawyerId,
      question: data.questionId,
    };

    const createdAnswer = new this.answerModel(dataToSave);

    await this.questionModel.updateOne(
      { _id: data.questionId },
      { hasResponse: true },
    );

    return createdAnswer.save();
  }

  async recoverAnswer(questionId: string) {
    const answer = await this.answerModel
      .findOne({
        question: questionId,
      })
      .populate('question');

    if (!answer) {
      throw new RpcException({
        message: 'Does not exist answer for this question yet',
        httpCode: 404,
      });
    }

    return answer;
  }
}
