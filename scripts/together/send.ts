import { PrismaClient } from '@/prisma/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
// import { generateJsonl } from '@sendScript/together/generateJsonl';
// import { togetherFileUpload } from '@sendScript/together/togetherFileUpload';
// import { togetherFineTuning } from '@sendScript/together/togetherFineTuning';
// import { togetherModel } from '@sendScript/together/togetherModel';

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! }, { schema: 'dev' });

const prisma = new PrismaClient({ adapter });

// TODO : together API를 이용한 파인튜닝 학습은 중단
// 호스팅 비용도 문제지만 학습에 들어가는 비용도 상당히 크기 때문에 철회

const main = async () => {
  // const fileId = 'file-218f6066-04d8-4381-bf48-f1f5571721cf';
  // await generateJsonl({ prisma });
  // await togetherFileUpload();
  // await togetherFineTuning({ fileId });
  // await togetherModel();
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
