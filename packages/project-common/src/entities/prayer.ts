import { EntityCommonOmit } from "../dto";
import { stripHtml } from "../utils";
import ObjectID from "bson-objectid";
import {
  ArrayMaxSize,
  ArrayUnique,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
} from "class-validator";
import { Prayer as IPrayer, LanguageCode } from "database";

// Todo: fix generic type
interface ContructorProps
  extends Omit<IPrayer, EntityCommonOmit | "cleanBody" | "cleanDescription"> {
  id?: string;
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
  description: string;

  @IsString()
  @IsNotEmpty()
  cleanDescription: string;

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

  @IsEnum(LanguageCode)
  language: LanguageCode;

  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @IsDate()
  createdAt: Date = new Date();

  @IsString()
  @IsNotEmpty()
  lastUpdatedBy: string;

  @IsDate()
  updatedAt: Date = new Date();

  constructor(props: ContructorProps) {
    props.id = props.id || ObjectID().toHexString();
    props.relatedCategoriesId = [...new Set(props.relatedCategoriesId || [])];

    Object.assign(this, props);
    this.cleanBody = stripHtml(this.body);
    if (this.description) this.cleanDescription = stripHtml(this.description);
    const errors = validateSync(this);

    if (errors.length) throw new Error(JSON.stringify(errors, undefined, 2));
  }
}
