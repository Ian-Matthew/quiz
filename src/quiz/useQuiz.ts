import React from "react";
import { TriviaRound, Question, TriviaAction, TriviaRoundState } from "./types";
// Default state for a new game
export const defaultState: TriviaRound = {
  questions: [] as Question[],
  status: "IDLE",
  currentQuestionIndex: 0,
  time: 0,
};
// Reducer for the game state
const gameReducer = (state: TriviaRound, action: TriviaAction): TriviaRound => {
  switch (action.type) {
    case "START_ROUND":
      return {
        ...state,
        status: "ACTIVE",
        currentQuestionIndex: 0,
        time: 0,
      };

    case "NEXT_QUESTION": {
      // Get the next question
      const nextQuestionIndex = state.currentQuestionIndex + 1;
      // If we can keep asking questions, do so
      if (nextQuestionIndex < state.questions.length - 1) {
        return {
          ...state,
          currentQuestionIndex: nextQuestionIndex,
        };
      } else {
        //Otherwise, end the round
        return {
          ...state,
          status: "OVER",
        };
      }
    }

    case "ANSWER_QUESTION":
      const { answer } = action;
      const questions = [...state.questions].map((question, i) => {
        if (i === state.currentQuestionIndex) {
          return { ...question, user_answer: answer };
        }
        return question;
      });
      return {
        ...state,
        questions,
      };

    case "UPDATE_TIMER":
      return {
        ...state,
        time: state.time++,
      };
    default:
      throw new Error(`Invalid Action Type`);
  }
};

// The hook that returns the game state and any needed functions/computations
export function useQuiz({
  questions,
}: {
  questions: Question[];
}): TriviaRoundState {
  // Create state with passed in questions
  const [state, dispatch] = React.useReducer(gameReducer, {
    ...defaultState,
    questions,
  });

  // Computed Active Question
  const activeQuestion = state?.questions[state.currentQuestionIndex];

  // Answers a question
  function answerQuestion(answer: string) {
    dispatch({ type: "ANSWER_QUESTION", answer });
    setTimeout(() => {
      //Set timeout to allow for animation, and then move on to next question
      dispatch({ type: "NEXT_QUESTION" });
    }, 1500);
  }

  function startNewRound() {
    dispatch({ type: "START_ROUND" });
  }

  // Handle statuses ... loading and timer...
  React.useEffect(() => {
    let interval: number | null = null;
    if (state.status === "ACTIVE") {
      interval = window.setInterval(() => {
        dispatch({ type: "UPDATE_TIMER" });
      }, 1000);
    } else if (state.time !== 0) {
      window.clearInterval(interval);
    }
    return () => window.clearInterval(interval);
  }, [state.status, state.time]);

  return { ...state, answerQuestion, activeQuestion, startNewRound };
}
