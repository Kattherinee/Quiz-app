import React from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import PropTypes from "prop-types";

export default function Question({
  questionText,
  answers,
  onSelect,

  selectedAnswer,
  answerState,
  onSkipAnswer,
}) {
  return (
    <div id="question">
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelect}
      />
    </div>
  );
}
Question.propTypes = {
  questionText: PropTypes.string,
  answers: PropTypes.array,
  onSelect: PropTypes.func,
  selectedAnswer: PropTypes.string,
  answerState: PropTypes.string,
  onSkipAnswer: PropTypes.func,
};
