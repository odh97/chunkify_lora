import { DIFFICULTY_LEVEL } from '@/cron/common/cron.data';
import { DiagnosticTagType, WorksheetType } from '@/cron/common/cron.type';
import { diagnostic_tag, training_sentence } from '@/prisma/generated/prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class CronService {
  constructor(private readonly prisma: PrismaService) {}

  async studyXlsxUpdateData() {
    console.log('=================== 엑셀 데이터 업데이트 크론잡 ===================');

    const workbook = XLSX.readFile('miraen-sentences-v1.xlsx');

    const sheetName = workbook.SheetNames[2];
    const worksheet = workbook.Sheets[sheetName];

    const sheetData = XLSX.utils.sheet_to_json(worksheet);

    for (const row of sheetData as WorksheetType[]) {
      const sheetDifficulty = row['difficulty'];
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

  //  진단 태그 배열 처리 / (내부 함수 - studyXlsxUpdateData)
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

  // 진단 태그 데이터 업데이트
  async diagnosticTagUpdateData() {
    console.log('=================== 진단태그 데이터 업데이트 크론잡 ===================');

    const workbook = XLSX.readFile('miraen-sentences-v1.xlsx');

    const sheetName = workbook.SheetNames[3];
    const worksheet = workbook.Sheets[sheetName];

    const sheetData = XLSX.utils.sheet_to_json(worksheet);

    for (const row of sheetData as DiagnosticTagType[]) {
      const sheetObject: Omit<diagnostic_tag, 'id' | 'created_at' | 'updated_at'> = {
        category: row['category'],
        tag_name: row['tagName'],
        description: row['description'],
      };

      await this.prisma.diagnostic_tag.create({
        data: sheetObject,
      });
    }

    console.log('=================== 진단태그 데이터 업데이트 크론잡 완료 ===================');
  }

  async loraTraining() {
    // {"prompt": "다음 청크를 평가해줘: [청크 내용]", "completion": "Good - 문맥이 자연스럽게 이어짐"}
    // {"prompt": "다음 청크를 평가해줘: [청크 내용]", "completion": "Bad - 문장이 중간에 잘림"}
  }
}
