import {
  ListParams,
  RepositoryCreateParams,
  RepositoryEntity,
  RepositoryUpdateParams,
  WhereParams,
} from '@global/types/repository';
import { ConflictException, NotFoundException } from '@nestjs/common';
import {
  EntityUniqueParams,
  IBaseRepository,
} from '@repositories/base/base.interface.repository';
import {
  MongoReturnProperties,
  mapMongoFilter,
  mapMongoListParams,
  mapMongoParams,
  mapMongoReturn,
} from '@repositories/helper';
import { HydratedDocument, Model } from 'mongoose';

export class MongoAbstractRepository<
  Entity extends RepositoryEntity<Entity>,
  UniqueKeys extends keyof Entity,
  DocumentModel extends HydratedDocument<Entity>,
> implements IBaseRepository<Entity, UniqueKeys>
{
  constructor(private readonly model: Model<DocumentModel>) {}
  async list(params: ListParams<Entity>): Promise<Entity[]> {
    const { filter, pagination, sort } = mapMongoListParams<Entity>(params);

    const list = await this.model
      .find(filter, null, pagination)
      .sort(sort)
      .lean();

    // TODO: fix generic function
    return list.map(mapMongoReturn) as unknown as Entity[];
  }

  async find(
    uniqueParam: EntityUniqueParams<Entity, UniqueKeys>,
  ): Promise<Entity> {
    const params = mapMongoParams(uniqueParam);

    const found = await this.model.findOne(params).lean();
    if (!found) throw new NotFoundException('Category not found');
    return mapMongoReturn(
      found as MongoReturnProperties & Record<string, any>,
    ) as Entity;
  }

  async count(where?: WhereParams<Entity>): Promise<number> {
    const count = await this.model.count(mapMongoFilter(where || {}));

    return count;
  }

  async create(payload: RepositoryCreateParams<Entity>): Promise<Entity> {
    try {
      const createdAt = await this.model.create(payload);

      return mapMongoReturn(createdAt.toJSON()) as Entity;
    } catch (error) {
      if (error?.name === 'MongoServerError' && error?.code === 11000)
        throw new ConflictException('Already exists.');
      throw new Error(error);
    }
  }

  async update(
    uniqueParam: EntityUniqueParams<Entity, UniqueKeys>,
    payload: RepositoryUpdateParams<Entity>,
  ): Promise<Entity> {
    const params = mapMongoParams(uniqueParam);

    const updated = await this.model.findOneAndUpdate(params, payload, {
      new: true,
    });

    if (!updated) throw new NotFoundException('Not found');

    return mapMongoReturn(updated.toObject()) as unknown as Entity;
  }

  async delete(
    uniqueParam: EntityUniqueParams<Entity, UniqueKeys>,
  ): Promise<Entity> {
    const params = mapMongoParams(uniqueParam);

    const deleted = await this.model.findOneAndDelete(params).lean();
    if (!deleted) throw new NotFoundException('Not found');

    return mapMongoReturn(
      deleted as MongoReturnProperties & Record<string, any>,
    ) as Entity;
  }
}
