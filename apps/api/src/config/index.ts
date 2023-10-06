import { Expose, plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
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
}

const validateEnvironment = () => {
  const environments: Record<keyof EnvironmentConfig, any> = {
    ENVIRONMENT: process.env.ENVIRONMENT,
    SERVER_PORT: Number(process.env.SERVER_PORT),
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
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
