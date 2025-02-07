import React from "react";
import { useState } from "react";
import QUESTIONS from "../questions";
import endQuizImg from "../assets/quiz-complete.png";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const shuffledAnswers = QUESTIONS[activeQuestionIndex].answers.sort(
    () => Math.random() - 0.5
  );

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  function handleSelectAnswer(answerSelected) {
    setUserAnswers((prev) => {
      return [...prev, answerSelected];
    });
  }

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={endQuizImg} alt="" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer, id) => {
            return (
              <li key={id} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>
                  {" "}
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
