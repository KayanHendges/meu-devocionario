import { Prayer } from '@entities/prayer';
import { mapQueryToService } from '@global/utils.ts/service';
import { Inject, Injectable } from '@nestjs/common';
import { CreatePrayerDTO, ListPrayersQueryDTO } from '@prayers/prayers.dto';
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

  async create(payload: CreatePrayerDTO): Promise<Prayer> {
    const prayer = new Prayer(payload);

    const categories = [...prayer.relatedCategories, prayer.category];
    const categoriesFound = this.categoriesRepository.findMany(categories);
    const missingCategories

    return this.prayersRepository.create(prayer);
  }
}
