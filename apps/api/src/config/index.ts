import { plainToInstance } from 'class-transformer';
import { IsEnum, IsPositive, IsString, validateSync } from 'class-validator';

enum Environment {
  development = 'development',
  production = 'production',
}

export class EnvironmentConfig {
  @IsEnum(Environment)
  ENVIRONMENT: keyof typeof Environment = 'development';

  @IsPositive()
  SERVER_PORT = 3333;

  @IsString()
  DATABASE_URL: string;
}

const validateEnvironment = () => {
  const environments: Record<keyof EnvironmentConfig, string | undefined> = {
    ENVIRONMENT: process.env.ENVIRONMENT,
    SERVER_PORT: process.env.SERVER_PORT,
    DATABASE_URL: process.env.DATABASE_URL,
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
