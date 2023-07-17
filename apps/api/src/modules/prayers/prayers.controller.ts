import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePrayerDTO, ListPrayersQueryDTO } from '@prayers/prayers.dto';
import { PrayersService } from '@prayers/prayers.service';

@Controller('prayers')
export class PrayersController {
  constructor(private readonly prayersService: PrayersService) {}

  @Get()
  list(@Query() query: ListPrayersQueryDTO) {
    return this.prayersService.list(query);
  }

  @Post()
  create(@Body() body: CreatePrayerDTO) {
    return this.prayersService.create(body);
  }
}
