export interface Question {
  letter: string;
  clue: string;
  answer: string;
  category: string;
}

export interface GameSettings {
  totalTime: number; // en minutos
  customQuestions: Question[];
}

export interface GameState {
  currentLetter: string;
  completedLetters: Record<string, 'correct' | 'incorrect' | 'passed'>;
  score: number;
  timeLeft: number; // en segundos
  gameStarted: boolean;
  gameFinished: boolean;
  currentRound: number;
}

export interface LetterState {
  letter: string;
  status: 'pending' | 'correct' | 'incorrect' | 'passed';
}