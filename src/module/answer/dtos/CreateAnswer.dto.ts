import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnswerDTO {
  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsString()
  @IsNotEmpty()
  questionId: string;

  @IsString()
  @IsNotEmpty()
  accountId: string;
}
