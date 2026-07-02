import * as dotenv from 'dotenv';
import Together from 'together-ai';

dotenv.config();

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

export const togetherModel = async () => {
  console.log('============ AI 모델 테스트 시작 ============');

  // const sample = {
  //   prompt:
  //     '다음 영어 문장을 청크로 분할한 결과를 평가해줘.\n\n문장: I live in Sejong, Korea.\n난이도: 1\n단어수: 5\n권장 청크: I live / in Sejong, Korea\n예상 실패 포인트: in Sejong Korea 를 단어별로 끊는지\n\n유저가 위 문장을 청킹했을 때 진단 태그와 점수를 반환해줘.',
  //   completion:
  //     '진단 태그: [①청킹수준] 단어단위청킹, [⑤전치사구] 전치사구미인식\n예상 실패 포인트: in Sejong Korea 를 단어별로 끊는지\n참고 난이도: 1',
  // };

  const sentence = 'I live in Sejong, Korea.';
  const userChunking = 'I live / in Sejong, Korea';

  //   const response = await together.endpoints.create({
  //     model: "xzdheogus1_a43f/Meta-Llama-3.1-8B-Instruct-Reference-chunkify-v1-339da943",
  //     display_name: "chunkify--v1",
  //     hardware: "4x_nvidia_h100_80gb_sxm",
  //     autoscaling: {
  //         min_replicas: 1,
  //         max_replicas: 1
  //     }
  // });

  const response = await together.chat.completions.create({
    model: 'xzdheogus1_a43f/Meta-Llama-3.1-8B-Instruct-Reference-chunkify-v1-339da943',
    messages: [
      {
        role: 'user',
        content: `문장: ${sentence}\n유저 청킹: ${userChunking}\n진단해줘.`,
      },
    ],
  });

  console.log('response -', response);

  console.log('content -', response.choices[0].message?.content);

  console.log('============ AI 모델 테스트 종료 ============');

  return response.choices[0].message?.content;
};

// 원화 1640
// $0.433 Per minute hosted
// 1시간당 $0.433 * 60 = $25.98
// 1시간당 원화 요금 : 25.98 * 1640 = 42,607.2원
// 하루 원화 요금 : 42,607.2 * 24 = 1,022,572.8원
// 한달 원화 요금 : 1,022,572.8 * 30 = 30,677,184원
