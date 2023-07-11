import { IsNotEmpty, IsString } from 'class-validator';

export class FindCategoryParamDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
