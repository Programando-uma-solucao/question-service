import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDTO {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  accountId: string;

  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  tags: Array<string>;
}
