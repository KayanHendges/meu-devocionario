import { Expose, plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsPositive,
  IsString,
  ValidateNested,
  validateSync,
} from 'class-validator';

enum Environment {
  development = 'development',
  production = 'production',
}

export class MongoDBConfig {
  @IsString()
  @Expose()
  MONGODB_USERNAME: string;

  @IsString()
  @Expose()
  MONGODB_PASSWORD: string;

  @IsString()
  @Expose()
  MONGODB_AUTH_SOURCE: string;

  @IsString()
  @Expose()
  MONGODB_HOST: string;

  @IsString()
  @Expose()
  MONGODB_DATABASE: string;
}

export class EnvironmentConfig {
  @IsEnum(Environment)
  ENVIRONMENT: keyof typeof Environment = 'development';

  @IsPositive()
  SERVER_PORT = 3333;

  @Expose()
  @ValidateNested()
  mongo: MongoDBConfig;
}

const validateEnvironment = () => {
  const environments = {
    ENVIRONMENT: process.env.ENVIRONMENT,
    SERVER_PORT: process.env.SERVER_PORT,
    mongo: {
      MONGODB_USERNAME: process.env.MONGODB_USERNAME,
      MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
      MONGODB_AUTH_SOURCE: process.env.MONGODB_AUTH_SOURCE,
      MONGODB_HOST: process.env.MONGODB_HOST,
      MONGODB_DATABASE: process.env.MONGODB_DATABASE,
    },
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
