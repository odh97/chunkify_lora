import Together from 'together-ai';

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

export async function togetherFileUpload() {
  const file = await together.files.upload('training_data.jsonl', 'fine-tune');

  console.log('업로드 완료:', file.id);
  return file.id;
}
