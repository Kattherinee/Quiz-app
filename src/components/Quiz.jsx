import React from "react";
import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import endQuizImg from "../assets/quiz-complete.png";
import Question from "./Question";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(answerSelected) {
      setAnswerState("answered");
      setUserAnswers((prev) => {
        return [...prev, answerSelected];
      });
      setTimeout(() => {
        if (answerSelected === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else setAnswerState("wrong");

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },

    [activeQuestionIndex]
  );

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

  return (
    <div id="quiz">
      <Question
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSelect={handleSelectAnswer}
        answerState={answerState}
        selectedAnswer={userAnswers[activeQuestionIndex]}
        onSkipAnswer={handleSkipAnswer}
        key={activeQuestionIndex}
      />
    </div>
  );
}
