import { DIFFICULTY_LEVEL } from '@/cron/common/cron.data';
import { WorksheetType } from '@/cron/common/cron.type';
import { training_sentence } from '@/prisma/generated/prisma/client';
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
      const sheetDifficulty = row['difficulty'] as '하' | '중' | '상';
      const difficultyNumber = DIFFICULTY_LEVEL[sheetDifficulty];

      const tags = row['diagnosticTag'];
      const tagsArray = this.diagnosticTagsArraySplit(tags);

      const sheetObject: Omit<training_sentence, 'id' | 'created_at' | 'updated_at'> = {
        difficulty: difficultyNumber,
        sentence: row['sentence'],
        recommended_chunking: row['recommendedChunk'],
        expected_failure_point: row['expectedFailurePoint'],
        polysemy: row['polysemyTrap'],
        word_count: row['wordCount'],
        diagnostic_tags: tagsArray,
      };

      await this.prisma.training_sentence.create({
        data: sheetObject,
      });
    }

    console.log('=================== 엑셀 데이터 업데이트 크론잡 완료 ===================');
  }

  private diagnosticTagsArraySplit(tags?: string | null): string[] {
    if (!tags) return [];

    const lineBreakRegex = /\r\n|\r|\n/;
    const tagsArray = tags.split(lineBreakRegex).map(tag => tag.trim());

    const tagsSliceFilterList: string[] = [];

    for (const tag of tagsArray) {
      // [/]슬라이스만 체크해서 처리 예정
      if (!tag.includes('/')) {
        tagsSliceFilterList.push(tag);
        continue;
      }

      const tagSliceSplit = tag.split('/');
      const [bigTag] = tagSliceSplit[0].split(' ');

      for (let index = 0; index < tagSliceSplit.length; index++) {
        const data = tagSliceSplit[index].trim();

        if (index === 0) {
          tagsSliceFilterList.push(data);
          continue;
        }

        tagsSliceFilterList.push(`${bigTag} ${data}`);
      }
    }

    return tagsSliceFilterList;
  }

  diagnosticTagUpdateData() {
    console.log('=================== 진단태그 데이터 업데이트 크론잡 ===================');

    const workbook = XLSX.readFile('miraen-sentences-v1.xlsx');

    const sheetName = workbook.SheetNames[1];
    const worksheet = workbook.Sheets[sheetName];

    const sheetData = XLSX.utils.sheet_to_json(worksheet);

    return '';
  }
}
