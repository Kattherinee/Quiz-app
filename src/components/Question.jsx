import React, { useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import PropTypes from "prop-types";
import QUESTIONS from "../questions.js";

export default function Question({ onSelect, idx, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: null,
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(selected) {
    setAnswer({
      selectedAnswer: selected,
      isCorrect: null,
    });

    setTimeout(() => {
      const isCorrect = QUESTIONS[idx].answers[0] === selected;
      setAnswer({ selectedAnswer: selected, isCorrect });

      setTimeout(() => {
        onSelect(selected);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={!answer.selectedAnswer ? onSkipAnswer : undefined}
        mode={answerState}
      />
      <h2>{QUESTIONS[idx].text}</h2>
      <Answers
        answers={QUESTIONS[idx].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}

Question.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onSkipAnswer: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
};
