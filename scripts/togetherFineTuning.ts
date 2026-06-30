import Together from 'together-ai';

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

export const togetherFineTuning = async ({ fileId }: { fileId: string }) => {
  const createJob = await together.fineTuning.create({
    training_file: fileId,
    model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Reference',
    n_epochs: 3,
    learning_rate: 0.00002,
    training_type: {
      type: 'Lora',
      lora_r: 8,
      lora_alpha: 16,
    },
    suffix: 'chunkify-v1',
  });

  console.log('학습 시작:', createJob.id);

  const job = await together.fineTuning.retrieve(createJob.id);

  console.log('모델 정보 :', job);
};
