import { PrismaClient } from '@/prisma/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! }, { schema: 'dev' });

const prisma = new PrismaClient({ adapter });

const main = async () => {
  const data = await prisma.training_sentence.findMany();

  console.log(data);
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
