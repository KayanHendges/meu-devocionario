import { config } from '@api/config';
import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (): MongooseModuleFactoryOptions => {
        const {
          MONGODB_HOST,
          MONGODB_AUTH_SOURCE,
          MONGODB_PASSWORD,
          MONGODB_USERNAME,
          MONGODB_SRV,
        } = config.mongo;

        return {
          authSource: MONGODB_AUTH_SOURCE,
          uri: `mongodb${MONGODB_SRV ? '+srv' : ''}://${MONGODB_HOST}`,
          auth: {
            username: MONGODB_USERNAME,
            password: MONGODB_PASSWORD,
          },
          dbName: config.mongo.MONGODB_DATABASE,
        };
      },
    }),
  ],
})
export class MongoDBModule {}
