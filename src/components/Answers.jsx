import React from "react";
import { useRef } from "react";
import PropTypes from "prop-types";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers].sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer, id) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = "";
        if (isSelected && answerState === "answered") {
          cssClass = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }
        return (
          <li key={id} className="answer">
            <button onClick={() => onSelect(answer)} className={cssClass}>
              {" "}
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

Answers.propTypes = {
  answers: PropTypes.array,
  selectedAnswer: PropTypes.string,
  answerState: PropTypes.string,
  onSelect: PropTypes.func,
};
