import React from "react";
import questionJSON from "./questions.json";
import { useElementSize } from "usehooks-ts";
import classNames from "classnames";
import { Question } from "./Question";
import { shuffleArray } from "./lib/shuffleArrray";
import { Answer } from "./Answer";
import { getColor } from "./lib/categories";

const LETTERS = ["A", "B", "C", "D"];

export function Start() {
  // The questions for the round
  const questions = questionJSON.results;
  // The current questionIndex
  const [questionIndex, setQuestionIndex] = React.useState(0);
  // Current question
  const question = questions[questionIndex];
  // Answer Section ref
  const [answerSectionRef, { height }] = useElementSize();
  // The selected Answer
  const [selectedAnswer, setSelectedAnswer] = React.useState<null | string>(
    null
  );

  // Memoize the answer choices
  const answers = React.useMemo(() => createAnswers(), [questionIndex]);

  function createAnswers(): any[] {
    return shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]);
  }

  // When an answer is selected
  function handleSelection(answer: string) {
    // Set selected answer
    setSelectedAnswer(answer);
    setTimeout(() => {
      //Set timeout to allow for animation, and then move on to next question
      setQuestionIndex(questionIndex + 1);
    }, 1500);
  }

  React.useLayoutEffect(() => {
    // Whenever questionIndex changes, reset selected answer
    setSelectedAnswer(null);
  }, [questionIndex]);

  return (
    <div className="h-full  flex-grow min-h-screen flex relative w-full">
      {/* Question Screen/Section*/}
      <div
        style={{
          maxHeight: `calc(100vh - ${height}px)`,
          backgroundColor: getColor(question.category),
          transition: "background-color .5s ",
        }}
        className="p-4 sm:p-14 items-center w-full flex px-14 relative"
      >
        {/* Text of the current question */}
        <Question key={questionIndex} question={question} />

        {/* Category of the current question */}
        <div className="absolute top-0 right-0 px-14 font-question">
          {question.category}
        </div>
      </div>

      {/* Answers */}
      <div
        ref={answerSectionRef}
        className={classNames(
          "bg-black p-4 sm:p-14 overflow-hidden absolute transition-all transform translate-y-0 w-full flex-0 bottom-0 font-question"
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {answers.map((answer, i) => {
            return (
              <Answer
                answer={answer}
                key={answer}
                selectedAnswer={selectedAnswer}
                correctAnswer={question.correct_answer}
                letterChoice={LETTERS[i]}
                handleSelection={handleSelection}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
