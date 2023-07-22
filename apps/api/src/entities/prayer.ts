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
} from 'shared-types';

// Todo: fix generic type
interface ContructorProps {
  id?: string;
  title: string;
  description: string | null;
  body: string;
  category: string;
  relatedCategories?: string[];
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
  body: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  cleanBody: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  // Todo: set limit of items
  @IsString({ each: true })
  @ArrayMaxSize(10)
  @ArrayUnique()
  @IsOptional()
  relatedCategories: string[] = [];

  @IsEnum(LanguageCodesEnum)
  language: LanguageCodes;

  @IsDate()
  updatedAt: Date = new Date();

  @IsDate()
  createdAt: Date = new Date();

  constructor(props: ContructorProps) {
    props.id = props.id || uuidv4();
    props.relatedCategories = [...new Set(props.relatedCategories || [])];

    Object.assign(this, props);
    this.cleanBody = stripHtml(this.body);
    const errors = validateSync(this);

    if (errors.length) throw new Error(JSON.stringify(errors, undefined, 2));
  }
}
