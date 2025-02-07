import React from "react";
import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import endQuizImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    answerSelected
  ) {
    setUserAnswers((prev) => {
      return [...prev, answerSelected];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={endQuizImg} alt="" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  const shuffledAnswers = QUESTIONS[activeQuestionIndex].answers.sort(
    () => Math.random() - 0.5
  );

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
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
