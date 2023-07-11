import { CategoriesController } from '@categories/categories.controller';
import { CategoriesService } from '@categories/categories.service';
import { Module } from '@nestjs/common';
import { CategoriesRepositoryModule } from '@repositories/categories/categories.repository.module';

@Module({
  imports: [CategoriesRepositoryModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
