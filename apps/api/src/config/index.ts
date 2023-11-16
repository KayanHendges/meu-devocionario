import { Expose, plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  isEmail,
  validateSync,
} from 'class-validator';

enum Environment {
  development = 'development',
  production = 'production',
}

export class EnvironmentConfig {
  @IsEnum(Environment)
  @Expose()
  ENVIRONMENT: keyof typeof Environment = 'development';

  @IsPositive()
  @IsOptional()
  @Expose()
  SERVER_PORT = 3333;

  @IsString()
  @Expose()
  DATABASE_URL: string;

  @IsString()
  @Expose()
  JWT_SECRET: string;

  @IsString()
  @Expose()
  JWT_EXPIRES_IN: string;

  @IsString()
  @Expose()
  SMTP_HOST: string;

  @IsString()
  @Expose()
  SMTP_EMAIL: string;

  @IsString()
  @Expose()
  SMTP_PASSWORD: string;

  @IsPositive()
  @IsNumber()
  @Expose()
  SMTP_PORT: number;
}

const validateEnvironment = () => {
  const environments: Record<keyof EnvironmentConfig, any> = {
    ENVIRONMENT: process.env.ENVIRONMENT,
    SERVER_PORT: Number(process.env.SERVER_PORT),
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_EMAIL: process.env.SMTP_EMAIL,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_PORT: process.env.SMTP_PORT,
  };

  const configInstance = plainToInstance(EnvironmentConfig, environments, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });

  const errors = validateSync(configInstance);

  if (errors.length) throw new Error(JSON.stringify(errors, undefined, 2));

  return configInstance as EnvironmentConfig;
};

export const config = validateEnvironment();
