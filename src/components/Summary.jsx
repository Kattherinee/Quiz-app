import React from "react";
import endQuizImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

import PropTypes from "prop-types";

export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  ).length;

  const totalAnswers = userAnswers.length || 1;

  const skippedAnswersShare = (
    (skippedAnswers.length / totalAnswers) *
    100
  ).toFixed(0);
  const correctAnswersShare = ((correctAnswers / totalAnswers) * 100).toFixed(
    0
  );
  const wrongAnswersShare = (
    100 -
    skippedAnswersShare -
    correctAnswersShare
  ).toFixed(0);

  return (
    <div id="summary">
      <img src={endQuizImg} alt="Trophy icon" />
      <h2>Quiz Completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">Answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">Answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, idx) => {
          let cssClass = "user-answer";
          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[idx].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={answer}>
              <h3>{idx + 1}</h3>
              <p className="question">Question: {QUESTIONS[idx].answers[0]}</p>
              <p className={cssClass}>Your answer: {answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
Summary.propTypes = {
  userAnswers: PropTypes.array,
};
