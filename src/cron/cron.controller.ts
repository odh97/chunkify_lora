import { Controller } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CronService } from '@/cron/cron.service';

@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

  // 20초 크론 (개발용)
  // @Cron('*/1 * * * *')
  @Cron('*/20 * * * * *')
  studyXlsxUpdateData() {
    this.cronService.studyXlsxUpdateData();
  }
}
