import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: 'Question',
  })
  question: string;

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
