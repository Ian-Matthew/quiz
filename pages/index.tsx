import React from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { getQuestions } from "../src/lib/getQuestions";
import { Question } from "../src/quiz/types";
import { useQuiz } from "../src/quiz/useQuiz";
import { useElementSize } from "usehooks-ts";
import { getColor } from "../src/lib/categories";
import { QuestionText } from "../src/Question";
import { Option } from "../src/Option";
const Home: NextPage = ({ questions }: { questions: Question[] }) => {
  const quiz = useQuiz({ questions });
  const [controlsRef, { height }] = useElementSize();
  return (
    <div
      style={{
        transition: "all .5s ease-in-out",
        backgroundColor:
          quiz.status === "ACTIVE"
            ? getColor(quiz.activeQuestion.category)
            : "white",
      }}
      className="h-full flex-grow min-h-screen flex relative w-full"
    >
      <GameScreen
        style={{
          maxHeight: `calc(100vh - ${height}px)`,
        }}
      >
        {/* NEW GAME SCREEN */}
        {quiz.status === "IDLE" && (
          <NewGameScreen startNewGame={quiz.startNewRound} />
        )}
        {/* ACTIVE/CURRENTLY PLAYING GAME SCREEN */}
        {quiz.status === "ACTIVE" && (
          <ActiveGameScreen activeQuestion={quiz.activeQuestion} />
        )}
        {quiz.status === "OVER" && <div>over</div>}
      </GameScreen>
      <GameControls ref={controlsRef}>
        {quiz.status === "ACTIVE" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {quiz.activeQuestion.options.map((option, i) => {
              return (
                <Option
                  key={option.value}
                  option={option}
                  activeQuestion={quiz.activeQuestion}
                  handleSelection={quiz.answerQuestion}
                />
              );
            })}
          </div>
        )}
      </GameControls>
    </div>
  );
};

function ActiveGameScreen({ activeQuestion }: { activeQuestion: Question }) {
  return (
    <>
      <QuestionText
        key={activeQuestion.correct_answer}
        question={activeQuestion}
      />
      <div className="absolute top-0 right-0 px-14 font-question">
        {activeQuestion.category}
      </div>
    </>
  );
}

function NewGameScreen({ startNewGame }: { startNewGame: () => void }) {
  return (
    <div>
      <h1 className="font-question text-5xl">Let's Get Quizzy</h1>
      <button
        onClick={() => startNewGame()}
        className="bg-black mt-10 text-white px-8 py-3 text-2xl"
      >
        Start Game
      </button>
    </div>
  );
}

function GameScreen({
  style,
  children,
}: {
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        transition: "all .5s ",
        ...style,
      }}
      className="p-4 sm:p-14 items-center w-full flex px-14 relative max-w-screen-lg"
    >
      {children}
    </div>
  );
}

type Props = { children?: React.ReactNode };
export type Ref = HTMLDivElement;
export const GameControls = React.forwardRef<Ref, Props>((props, ref) => (
  <div
    ref={ref}
    className="bg-black p-4 sm:p-14 max-h-min overflow-hidden absolute transition-all transform translate-y-0 w-full flex-0 bottom-0 font-question"
    {...props}
  ></div>
));

GameControls.displayName = "GameControls";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const questions = await getQuestions();
  return {
    props: {
      questions,
    },
  };
};

export default Home;
