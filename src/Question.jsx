import React from "react";

export default function Question(props) {
  function checkCorrect(answerNumber) {
    let correctAnswerNumber = 0;
    let isCorrectAnswer = false;

    if (props.trivia.answer1.isCorrect) {
      correctAnswerNumber = 1;
      if (answerNumber === 1) {
        isCorrectAnswer = true;
      } else {
        console.log("wrong answer!");
      }
    } else if (props.trivia.answer2.isCorrect) {
      correctAnswerNumber = 2;
      if (answerNumber === 2) {
        isCorrectAnswer = true;
      } else {
        console.log("wrong answer!");
      }
    } else if (props.trivia.answer3.isCorrect) {
      correctAnswerNumber = 3;
      if (answerNumber === 3) {
        isCorrectAnswer = true;
      } else {
        console.log("wrong answer!");
      }
    } else if (props.trivia.answer4.isCorrect) {
      correctAnswerNumber = 4;
      if (answerNumber === 4) {
        isCorrectAnswer = true;
      } else {
        console.log("wrong answer!");
      }
    }

    props.selectAnswer(
      answerNumber,
      props.trivia.id,
      correctAnswerNumber,
      isCorrectAnswer
    );
  }

  return (
    <section className="container-question">
      <h2 className="question">{props.trivia.question}</h2>
      <div className="answers-container">
        {props.trivia.answer1.answer !== "undefined" && (
          <button
            className="answer"
            style={{
              backgroundColor: props.answersStyles[props.trivia.id - 1]?.[1],
            }}
            onClick={() => checkCorrect(1)}
          >
            {props.trivia.answer1.answer}
          </button>
        )}
        {props.trivia.answer2.answer !== "undefined" && (
          <button
            className="answer"
            style={{
              backgroundColor: props.answersStyles[props.trivia.id - 1]?.[2],
            }}
            onClick={() => checkCorrect(2)}
          >
            {props.trivia.answer2.answer}
          </button>
        )}
        {props.trivia.answer3.answer !== "undefined" && (
          <button
            className="answer"
            style={{
              backgroundColor: props.answersStyles[props.trivia.id - 1]?.[3],
            }}
            onClick={() => checkCorrect(3)}
          >
            {props.trivia.answer3.answer}
          </button>
        )}
        {props.trivia.answer4.answer !== "undefined" && (
          <button
            className="answer"
            style={{
              backgroundColor: props.answersStyles[props.trivia.id - 1]?.[4],
            }}
            onClick={() => checkCorrect(4)}
          >
            {props.trivia.answer4.answer}
          </button>
        )}
      </div>
      <div className="question-divider"></div>
    </section>
  );
}
