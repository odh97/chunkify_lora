import { WorksheetType } from '@/cron/cron.type';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class CronService {
  constructor(private readonly prisma: PrismaService) {}

  async studyXlsxUpdateData() {
    console.log('=================== 엑셀 데이터 업데이트 크론잡 ===================');

    const workbook = XLSX.readFile('miraen-sentences-v1.xlsx');

    const sheetName = workbook.SheetNames[1];
    const worksheet = workbook.Sheets[sheetName];

    const sheetData = XLSX.utils.sheet_to_json(worksheet);

    for (const row of sheetData as WorksheetType[]) {
      const sheetObject = {
        difficulty: row['difficulty'],
        sentence: row['sentence'],
        recommendedChunk: row['recommendedChunk'],
        expectedFailurePoint: row['expectedFailurePoint'],
        polysemyTrap: row['polysemyTrap'],
        wordCount: row['wordCount'],
        diagnosticTag: row['diagnosticTag'],
      };

      // prisma;

      // console.log('sheetObject', sheetObject);

      const result = await this.prisma.$queryRaw<[{ search_path: string }]>`SHOW search_path`;
      console.log(result);

      const data = await this.prisma.training_sentence.findMany();

      console.log('data', data);
    }
  }
}
