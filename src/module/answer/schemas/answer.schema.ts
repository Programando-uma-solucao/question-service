import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

import { Question } from '../../question/schemas/question.schema';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: 'Question',
  })
  questionId: Question;

  @Prop({
    required: true,
  })
  answer: string;

  @Prop({
    required: true,
  })
  lawyerId: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
