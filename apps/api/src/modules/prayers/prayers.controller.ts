import { isObjectId } from '@global/utils.ts/regexValidate';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreatePrayerDTO,
  FindPrayerParams,
  ListPrayersQueryDTO,
  UpdatePrayerDTO,
} from '@prayers/prayers.dto';
import { PrayersService } from '@prayers/prayers.service';

@Controller('prayers')
export class PrayersController {
  constructor(private readonly prayersService: PrayersService) {}

  @Get()
  list(@Query() query: ListPrayersQueryDTO) {
    return this.prayersService.list(query);
  }

  @Get('/:id')
  find(@Param() { id }: FindPrayerParams) {
    const unique = isObjectId(id) ? { id } : { title: id };
    return this.prayersService.find(unique);
  }

  @Post()
  create(@Body() body: CreatePrayerDTO) {
    return this.prayersService.create(body);
  }

  @Patch(':id')
  update(@Param() { id }: FindPrayerParams, @Body() body: UpdatePrayerDTO) {
    const unique = isObjectId(id) ? { id } : { title: id };
    return this.prayersService.update(unique, body);
  }

  @Delete(':id')
  delete(@Param() { id }: FindPrayerParams) {
    const unique = isObjectId(id) ? { id } : { title: id };
    return this.prayersService.delete(unique);
  }
}
