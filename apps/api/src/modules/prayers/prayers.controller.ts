import { Public } from '@decorators/auth/public.route';
import { Claim } from '@decorators/claim/claim.decorator';
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

  @Public()
  @Get()
  list(@Query() query: ListPrayersQueryDTO) {
    return this.prayersService.list(query);
  }

  @Public()
  @Get(':unique')
  find(@Param() { unique }: UniquePrayerParams) {
    const uniqueParam = isObjectId(unique) ? { id: unique } : { title: unique };
    return this.prayersService.find(uniqueParam);
  }

  @Post()
  @Claim('prayer.create', 'user.all')
  create(@Body() body: CreatePrayerDTO) {
    return this.prayersService.create(body);
  }

  @Claim('prayer.update')
  @Patch(':unique')
  update(
    @Param() { unique }: UniquePrayerParams,
    @Body() body: UpdatePrayerDTO,
  ) {
    const uniqueParam = isObjectId(unique) ? { id: unique } : { title: unique };
    return this.prayersService.update(uniqueParam, body);
  }

  @Claim('prayer.delete')
  @Delete(':unique')
  delete(@Param() { unique }: UniquePrayerParams) {
    const uniqueParam = isObjectId(unique) ? { id: unique } : { title: unique };
    return this.prayersService.delete(uniqueParam);
  }
}
