import React from "react";
import classNames from "classnames";

export function Answer({
  answer,
  selectedAnswer,
  correctAnswer,
  letterChoice,
  handleSelection,
}: {
  answer: string;
  correctAnswer: string;
  selectedAnswer: null | string;
  letterChoice: string;
  handleSelection: (answer: string) => void;
}) {
  const isSelected = selectedAnswer === answer;
  return (
    <button
      onClick={() => {
        handleSelection(answer);
      }}
      className={classNames(
        `flex-row relative border-transparent transition-all border-[.1px] hover:border-[.1px] hover:border-white cursor-pointer   p-4 bg-[rgba(133,150,193,0.1)] items-center flex rounded-md text-xl lg:text-2xl  text-white`,
        {
          "!border-red-300 animate-typo":
            isSelected && answer !== correctAnswer,
          "!border-green-300 animate-pulse":
            selectedAnswer && answer === correctAnswer,
        }
      )}
    >
      <div className="flex-row items-center shadow flex w-full rounded-md  text-white">
        <div className="text-center text-white  font-semibold mr-5">
          {letterChoice}
        </div>
        <div className="">{answer}</div>
      </div>
    </button>
  );
}
