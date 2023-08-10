import { stripHtml } from '@global/utils.ts/formatters';
import {
  ArrayMaxSize,
  ArrayUnique,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import {
  LanguageCodes,
  Prayer as IPrayer,
  LanguageCodesEnum,
} from 'project-types';

// Todo: fix generic type
interface ContructorProps {
  id?: string;
  title: string;
  description: string | null;
  body: string;
  categoryId: string;
  relatedCategoriesId?: string[];
  language: LanguageCodes;
  updatedAt?: Date;
  createdAt?: Date;
}

export class Prayer implements IPrayer {
  @IsString()
  public readonly id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string | null = null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  cleanDescription: string | null = null;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  cleanBody: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString({ each: true })
  @ArrayMaxSize(10)
  @ArrayUnique()
  @IsOptional()
  relatedCategoriesId: string[] = [];

  @IsEnum(LanguageCodesEnum)
  language: LanguageCodes;

  @IsDate()
  updatedAt: Date = new Date();

  @IsDate()
  createdAt: Date = new Date();

  constructor(props: ContructorProps) {
    props.id = props.id || uuidv4();
    props.relatedCategoriesId = [...new Set(props.relatedCategoriesId || [])];

    Object.assign(this, props);
    this.cleanBody = stripHtml(this.body);
    if (this.description) this.cleanDescription = stripHtml(this.description);
    const errors = validateSync(this);

    if (errors.length) throw new Error(JSON.stringify(errors, undefined, 2));
  }
}
