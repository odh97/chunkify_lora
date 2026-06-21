import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { CronModule } from '@/cron/cron.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule, CronModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
