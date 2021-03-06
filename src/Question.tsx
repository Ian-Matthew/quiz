import React from "react";

export function QuestionText({ question, ...props }) {
  return (
    <div className="block">
      <h1
        key={question}
        style={{ lineHeight: "150%" }}
        dangerouslySetInnerHTML={{ __html: question.question }}
        className="text-black  inline transition-all font-semibold text-4xl sm:text-6xl font-question max-w-screen-md w-full question animate-reveal"
      ></h1>
    </div>
  );
}
