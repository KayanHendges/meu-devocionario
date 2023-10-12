import { ResponseList } from 'project-common';
import { Prayer } from '@entities/prayer';
import { stripHtml } from '@global/utils.ts/formatters';
import { mapQueryToService } from '@global/utils.ts/service';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreatePrayerDTO,
  UniquePrayer,
  ListPrayersQueryDTO,
  UpdatePrayerDTO,
} from '@prayers/prayers.dto';
import { IPrayerRepository } from '@repositories/prayer/prayer.repository.interface';
import { ICategoryRepository } from '@repositories/category/category.repository.interface';
import { JwtPayload } from '@auth/types';

@Injectable()
export class PrayersService {
  constructor(
    private readonly prayerRepository: IPrayerRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async list(params: ListPrayersQueryDTO): Promise<ResponseList<Prayer>> {
    const query = mapQueryToService(params);
    const { page, pageSize, where } = query;

    const list = await this.prayerRepository.list(query);
    const count =
      list.length <= query.pageSize
        ? list.length
        : await this.prayerRepository.count({ where });

    return { list, count, page, pageSize };
  }

  async find(params: UniquePrayer): Promise<Prayer> {
    return this.prayerRepository.find(params);
  }

  async create(payload: CreatePrayerDTO, user: JwtPayload): Promise<Prayer> {
    const prayer = new Prayer({
      ...payload,
      createdBy: user.id,
      lastUpdatedBy: user.id,
    });
    await this.validateCategories(prayer);

    return this.prayerRepository.create(prayer);
  }

  async update(
    params: UniquePrayer,
    payload: UpdatePrayerDTO,
    user: JwtPayload,
  ): Promise<Prayer> {
    const dbPrayer = await this.prayerRepository.find(params);

    const { id, ...prayer } = new Prayer({
      ...dbPrayer,
      ...payload,
      lastUpdatedBy: user.id,
    });

    await this.validateCategories(prayer);
    return this.prayerRepository.update({ id }, prayer);
  }

  async delete(params: UniquePrayer): Promise<Prayer> {
    return this.prayerRepository.delete(params);
  }

  private async validateCategories({
    categoryId,
    relatedCategoriesId,
  }: Partial<Prayer>) {
    if (!categoryId && !relatedCategoriesId?.length) return;

    const categories = [
      ...new Set([
        ...(relatedCategoriesId || []),
        ...(categoryId ? [categoryId] : []),
      ]),
    ];

    const categoriesFound = (
      await this.categoryRepository.list({ where: { id: { in: categories } } })
    ).map((it) => it.id);

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
