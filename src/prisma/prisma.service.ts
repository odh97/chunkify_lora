import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/prisma/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);

    const adapter = new PrismaPg(
      { connectionString: process.env.DATABASE_URL! },
      { schema: 'dev' }
    );

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
