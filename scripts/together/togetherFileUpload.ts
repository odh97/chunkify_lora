import * as dotenv from 'dotenv';
import Together from 'together-ai';
import { upload } from 'together-ai/lib/upload';
import * as path from 'path';

dotenv.config();

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

export async function togetherFileUpload() {
  // https://api.together.ai/files 에서 업로드하는게 빠름 (실제로 제대로 업로드가 안되는 경우가 있음)

  const filePath = path.resolve('training_data.jsonl');

  const file = await upload(together, filePath, 'fine-tune');

  console.log('file.id', file.id);

  return file.id;
}
