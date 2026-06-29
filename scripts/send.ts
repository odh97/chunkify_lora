import { PrismaClient } from '@/prisma/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! }, { schema: 'dev' });

const prisma = new PrismaClient({ adapter });

async function main() {
  const sentences = await prisma.training_sentence.findMany();

  for (const sentence of sentences) {
    // 처리 로직
    console.log(sentence);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
