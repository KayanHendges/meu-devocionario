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
  ListPrayersQueryDTO,
  UniquePrayerParams,
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
  find(@Param() { unique }: UniquePrayerParams) {
    const uniqueParam = isObjectId(unique) ? { id: unique } : { title: unique };
    return this.prayersService.find(uniqueParam);
  }

  @Post()
  create(@Body() body: CreatePrayerDTO) {
    return this.prayersService.create(body);
  }

  @Patch(':id')
  update(
    @Param() { unique }: UniquePrayerParams,
    @Body() body: UpdatePrayerDTO,
  ) {
    const uniqueParam = isObjectId(unique) ? { id: unique } : { title: unique };
    return this.prayersService.update(uniqueParam, body);
  }

  @Delete(':id')
  delete(@Param() { unique }: UniquePrayerParams) {
    const uniqueParam = isObjectId(unique) ? { id: unique } : { title: unique };
    return this.prayersService.delete(uniqueParam);
  }
}
