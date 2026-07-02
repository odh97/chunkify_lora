import * as dotenv from 'dotenv';
import Together from 'together-ai';

dotenv.config();

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

export const togetherFineTuning = async ({ fileId }: { fileId: string }) => {
  const createJob = await together.fineTuning.create({
    training_file: fileId,
    model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Reference',
    batch_size: 8,
    n_epochs: 3,
    n_checkpoints: 1,
    learning_rate: 0.00002,
    training_type: {
      type: 'Lora',
      lora_r: 8,
      lora_alpha: 16,
    },
    suffix: 'chunkify-v1',
  });

  console.log('학습 처리:', createJob.id);

  const job = await together.fineTuning.retrieve(createJob.id);

  console.log('모델 정보 :', job);

  // 학습 시작: ft-2e367e94-a16e
  const modelInfoSample = {
    adapter_output_path:
      's3://together-dev/finetune/6a4228a6efbb870001432226/xzdheogus1_a43f/Meta-Llama-3.1-8B-Instruct-Reference-chunkify-v1-339da943/ft-2e367e94-a16e_adapter',
    batch_size: 8,
    checkpoints: [],
    created_at: '2026-07-02T08:10:14.25Z',
    epochs_completed: 0,
    eval_price: 0,
    eval_steps: 0,
    eval_token_count: 0,
    evals_completed: 0,
    evals_paid_for: 0,
    events: [
      {
        created_at: '2026-07-02T08:10:14.337Z',
        level: '',
        message: 'Fine-tuning request created',
        object: 'fine-tune-event',
        type: 'JOB_PENDING',
      },
    ],
    gradient_accumulation_steps: 1,
    id: 'ft-2e367e94-a16e',
    learning_rate: 0.00002,
    lr_scheduler: { lr_scheduler_args: {}, lr_scheduler_type: 'linear' },
    max_grad_norm: 1,
    max_seq_length: 131072,
    max_steps: -1,
    merge_parent_adapter: false,
    model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Reference',
    model_output_name: 'xzdheogus1_a43f/Meta-Llama-3.1-8B-Instruct-Reference-chunkify-v1-339da943', // 학습에 사용된 모델
    model_output_path:
      's3://together-dev/finetune/6a4228a6efbb870001432226/xzdheogus1_a43f/Meta-Llama-3.1-8B-Instruct-Reference-chunkify-v1-339da943/ft-2e367e94-a16e',
    multimodal_params: {},
    n_checkpoints: 1,
    n_epochs: 3,
    n_evals: 0,
    packing: true,
    param_count: 0,
    random_seed: 42,
    refund_amount: 0,
    started_at: null,
    status: 'pending',
    steps_completed: 0,
    steps_paid_for: 0,
    suffix: 'chunkify-v1',
    token_count: 0,
    total_price: 0,
    total_steps: 0,
    train_on_inputs: null,
    train_price: 0,
    training_file: 'file-218f6066-04d8-4381-bf48-f1f5571721cf',
    training_files: null,
    training_method: { method: 'sft', train_on_inputs: 'auto' },
    training_type: {
      lora_alpha: 16,
      lora_r: 8,
      lora_trainable_modules: 'all-linear',
      type: 'Lora',
    },
    updated_at: '2026-07-02T08:10:14.25Z',
    user_id: '6a4228a6efbb870001432226',
    validation_files: null,
    validation_split_ratio: 0,
    warmup_ratio: 0,
    warmup_steps: 0,
    weight_decay: 0,
  };

  console.log('modelInfo', modelInfoSample);
};
