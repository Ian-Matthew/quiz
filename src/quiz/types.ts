export type Question = {
  category: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  options: Option[];
  user_answer: null | string;
};

export type LetterChoice = "A" | "B" | "C" | "D";

export type Option = {
  value: string;
  letter: LetterChoice;
};

export type TriviaRound = {
  questions: Question[];
  status: "IDLE" | "ACTIVE" | "OVER";
  currentQuestionIndex: number;
  time: number;
};

export interface TriviaRoundState extends TriviaRound {
  answerQuestion: (answer: string) => void;
  startNewRound: () => void;
  activeQuestion: Question;
}

export type TriviaAction =
  | { type: "START_ROUND" }
  | { type: "NEXT_QUESTION" }
  | { type: "ANSWER_QUESTION"; answer: string }
  | { type: "UPDATE_TIMER" };
