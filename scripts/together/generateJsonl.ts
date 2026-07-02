import { PrismaClient } from '@/prisma/generated/prisma/client';
import * as fs from 'fs';

// 문장 데이터를 JSONL 형식으로 변환하는 함수
export const generateJsonl = async ({ prisma }: { prisma: PrismaClient }) => {
  const sentences = await prisma.training_sentence.findMany();

  const jsonlData = sentences.map(row => ({
    prompt: `다음 영어 문장을 청크로 분할한 결과를 평가해줘.

문장: ${row.sentence}
난이도: ${row.difficulty}
단어수: ${row.word_count}
권장 청크: ${row.recommended_chunking}
예상 실패 포인트: ${row.expected_failure_point}

유저가 위 문장을 청킹했을 때 진단 태그와 점수를 반환해줘.`,

    completion: `진단 태그: ${row.diagnostic_tags.join(', ')}
예상 실패 포인트: ${row.expected_failure_point}
참고 난이도: ${row.difficulty}`,
  }));

  const jsonl = jsonlData.map(row => JSON.stringify(row)).join('\n');

  fs.writeFileSync('training_data.jsonl', jsonl);
  console.log(`${sentences.length}건 변환 완료`);
};
