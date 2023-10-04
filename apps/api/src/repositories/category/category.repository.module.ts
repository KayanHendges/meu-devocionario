import { Module } from '@nestjs/common';
import { PrismaProvider } from '@providers/prisma/prisma.provider';
import { ICategoryRepository } from '@repositories/category/category.repository.interface';
import { PrismaCategoryRepository } from '@repositories/category/implementations/prisma.category.repository';
@Module({
  controllers: [],
  providers: [
    PrismaProvider,
    {
      provide: ICategoryRepository,
      useClass: PrismaCategoryRepository,
    },
  ],
  exports: [ICategoryRepository],
})
export class CategoryRepositoryModule {}
