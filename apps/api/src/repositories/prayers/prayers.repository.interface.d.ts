import { Prayer } from '@entities/prayer';
import { IBaseRepository } from '@repositories/base/base.interface.repository';

type IPrayersRepository = IBaseRepository<Prayer, 'id' | 'title'>;
