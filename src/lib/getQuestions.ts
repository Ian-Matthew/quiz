import { shuffleArray } from "./shuffleArrray";
const LETTERS = ["A", "B", "C", "D"];

export async function getQuestions() {
  const data = await fetch(
    "https://opentdb.com/api.php?amount=10&type=multiple",
    { method: "GET" }
  );
  let { results: questions } = await data.json();
  return questions.map((question) => formatQuestion(question));
}

// format a question for the UI
function formatQuestion(question) {
  return {
    ...question,
    options: createOptions(question),
    user_selection: null,
  };
}

// Create options for a question
function createOptions(question) {
  return shuffleArray([
    ...question.incorrect_answers,
    question.correct_answer,
  ]).map((a, i) => {
    return {
      value: a,
      letter: LETTERS[i],
    };
  });
}
