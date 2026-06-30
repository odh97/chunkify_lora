import { PrismaClient } from '@/prisma/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
import { generateJsonl } from '@sendScript/generateJsonl';
import { togetherFileUpload } from '@sendScript/togetherFileUpload';
import { togetherFineTuning } from '@sendScript/togetherFineTuning';

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! }, { schema: 'dev' });

const prisma = new PrismaClient({ adapter });

const main = async () => {
  const fileId = 'testFileId';

  // await generateJsonl({ prisma });
  // await togetherFileUpload();
  // await togetherFineTuning({fileId});
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
