import { Prayer } from '@entities/prayer';
import { mapQueryToService } from '@global/utils.ts/service';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  CreatePrayerDTO,
  FindPrayerParams,
  ListPrayersQueryDTO,
  UpdatePrayerDTO,
} from '@prayers/prayers.dto';
import { ICategoriesRepository } from '@repositories/categories/categories.repository.interface';
import { IPrayersRepository } from '@repositories/prayers/prayers.repository.interface';

@Injectable()
export class PrayersService {
  constructor(
    @Inject('IPrayersRepository')
    private readonly prayersRepository: IPrayersRepository,
    @Inject('ICategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  async list(params: ListPrayersQueryDTO): Promise<ResponseList<Prayer>> {
    const query = mapQueryToService(params);
    const { page, pageSize, where } = query;

    const list = await this.prayersRepository.list(query);
    const count =
      list.length <= query.pageSize
        ? list.length
        : await this.prayersRepository.count(where);

    return { list, count, page, pageSize };
  }

  async find(params: FindPrayerParams): Promise<Prayer> {
    return this.prayersRepository.find(params);
  }

  async create(payload: CreatePrayerDTO): Promise<Prayer> {
    const prayer = new Prayer(payload);
    await this.validateCategories(prayer);

    return this.prayersRepository.create(prayer);
  }

  async update(
    params: FindPrayerParams,
    payload: UpdatePrayerDTO,
  ): Promise<Prayer> {
    if (payload.relatedCategories)
      payload.relatedCategories = [...new Set(payload.relatedCategories)];

    await this.validateCategories(payload);
    return this.prayersRepository.update(params, payload);
  }

  async delete(params: FindPrayerParams): Promise<Prayer> {
    return this.prayersRepository.delete(params);
  }

  private async validateCategories({
    category,
    relatedCategories,
  }: Partial<Prayer>) {
    if (!category && !relatedCategories?.length) return;

    const categories = [
      ...new Set([
        ...(relatedCategories || []),
        ...(category ? [category] : []),
      ]),
    ];

    const categoriesFound = (
      await this.categoriesRepository.findMany(categories)
    ).map((it) => it.name);

    const missingCategories = categories.filter(
      (it) => !categoriesFound.includes(it),
    );

    if (missingCategories.length)
      throw new BadRequestException(
        `The following categories does not exists: ${missingCategories.join(
          ', ',
        )}.`,
      );
  }
}
