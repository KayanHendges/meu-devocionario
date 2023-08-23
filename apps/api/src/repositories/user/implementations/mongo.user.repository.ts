import { User } from '@entities/user';
import {
  ListParams,
  RepositoryCreateParams,
  RepositoryUpdateParams,
  WhereParams,
} from '@global/types/repository';
import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '@providers/mongo/schemas/user.schema';
import {
  mapMongoListParams,
  mapMongoParams,
  mapMongoReturn,
} from '@repositories/helper';
import {
  IUserRepository,
  UserUniqueParams,
} from '@repositories/user/user.repository.interface';
import { Model } from 'mongoose';

export class MongoUserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async list(params: ListParams<User>): Promise<User[]> {
    const { filter, pagination, sort } = mapMongoListParams(params);

    const list = await this.userModel
      .find(filter, null, pagination)
      .sort(sort)
      .lean();

    return list.map(mapMongoReturn);
  }

  async find(uniqueParam: UserUniqueParams): Promise<User> {
    const params = mapMongoParams(uniqueParam);

    const category = await this.userModel.findOne(params).lean();
    if (!category) throw new NotFoundException('Category not found');

    return mapMongoReturn(category);
  }

  async count(where?: WhereParams<User>): Promise<number> {
    const count = await this.userModel.count(where || {});

    return count;
  }

  async create(payload: RepositoryCreateParams<User>): Promise<User> {
    const created = await this.userModel.create(payload);

    return mapMongoReturn(created.toJSON());
  }

  async update(
    uniqueParam: UserUniqueParams,
    payload: RepositoryUpdateParams<User>,
  ): Promise<User> {
    const params = mapMongoParams(uniqueParam);

    const updated = await this.userModel.findOneAndUpdate(params, payload, {
      new: true,
    });

    if (!updated) throw new NotFoundException('User not found');

    return mapMongoReturn(updated.toObject());
  }

  async delete(uniqueParam: UserUniqueParams): Promise<User> {
    const params = mapMongoParams(uniqueParam);

    const user = await this.userModel.findOne(params).lean();
    if (!user) throw new NotFoundException('User not found');

    await this.userModel.deleteOne({ _id: user._id }).lean();

    return mapMongoReturn(user);
  }
}
