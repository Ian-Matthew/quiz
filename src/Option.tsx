import React from "react";
import classNames from "classnames";
import { Option, Question } from "./quiz/types";

export function Option({
  option,
  activeQuestion,
  handleSelection,
}: {
  option: Option;
  activeQuestion: Question;
  handleSelection: (answer: string) => void;
}) {
  const isSelected = option.value === activeQuestion.user_answer;
  return (
    <button
      onClick={() => {
        handleSelection(option.value);
      }}
      className={classNames(
        `flex-row relative border-transparent bg-gray-900 transition-all border-[.1px] hover:border-[.1px] hover:border-white cursor-pointer   p-4 bg-blend-saturation items-center flex rounded-md text-xl lg:text-2xl  text-white`,
        {
          "!border-red-300 animate-typo":
            isSelected && option.value !== activeQuestion.correct_answer,
          "!border-green-300 animate-pulse":
            activeQuestion.user_answer &&
            activeQuestion.correct_answer === option.value,
        }
      )}
    >
      <div className="flex-row items-center shadow flex w-full rounded-md  text-white">
        <div className="text-center text-white  font-semibold mr-5">
          {option.letter}
        </div>
        <div className="">{option.value}</div>
      </div>
    </button>
  );
}
