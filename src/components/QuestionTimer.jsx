import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [timeLeft, setTimeLeft] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <progress
      id="question-time"
      max={timeout}
      value={timeLeft}
      className={mode}
    ></progress>
  );
}

QuestionTimer.propTypes = {
  timeout: PropTypes.int,
  onTimeout: PropTypes.func,
  mode: PropTypes.string,
};
