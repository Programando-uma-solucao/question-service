import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop({
    required: true,
  })
  question: string;

  @Prop({
    required: true,
  })
  accountId: string;

  @Prop({
    type: [String],
    required: true,
  })
  tags: Array<string>;

  @Prop({ type: Boolean, default: false })
  hasResponse: boolean;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
