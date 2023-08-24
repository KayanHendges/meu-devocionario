import { CategoriesController } from '@categories/categories.controller';
import { CategoriesService } from '@categories/categories.service';
import { Module } from '@nestjs/common';
import { CategoryRepositoryModule } from '@repositories/category/category.repository.module';

@Module({
  imports: [CategoryRepositoryModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
