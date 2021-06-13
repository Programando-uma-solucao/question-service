import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  @Prop({
    required: true,
  })
  questionId: string;

  @Prop({
    required: true,
  })
  answer: string;

  @Prop({
    required: true,
  })
  accountId: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
