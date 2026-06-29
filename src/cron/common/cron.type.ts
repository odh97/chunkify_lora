export interface WorksheetType {
  difficulty: '하' | '중' | '상';
  sentence: string;
  recommendedChunk: string;
  expectedFailurePoint: string;
  polysemyTrap: string;
  wordCount: number;
  diagnosticTag: string;
}

export interface DiagnosticTagType {
  category: string;
  tagName: string;
  description: string;
}
