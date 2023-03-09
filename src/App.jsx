import React, { useState, useEffect } from "react";
import Question from "./Question";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [triviaData, setTriviaData] = useState([]);
  const [answersData, setAnswersData] = useState([]);
  const [answersStyles, setAnswersStyles] = useState([
    { 1: "none", 2: "none", 3: "none", 4: "none" },
    { 1: "none", 2: "none", 3: "none", 4: "none" },
    { 1: "none", 2: "none", 3: "none", 4: "none" },
    { 1: "none", 2: "none", 3: "none", 3: "none" },
    { 1: "none", 2: "none", 3: "none", 4: "none" },
  ]);
  const [correctAnswers, setCorrectAnswers] = useState(null);
  const [resetGame, setResetGame] = useState(false);

  function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  function applyStyles() {
    let correctAnswersCounter = 0;
    setCorrectAnswers(correctAnswersCounter);
    let styles = [
      { 1: "none", 2: "none", 3: "none", 4: "none" },
      { 1: "none", 2: "none", 3: "none", 4: "none" },
      { 1: "none", 2: "none", 3: "none", 4: "none" },
      { 1: "none", 2: "none", 3: "none", 3: "none" },
      { 1: "none", 2: "none", 3: "none", 4: "none" },
    ];

    answersData.forEach(function (answer, index) {
      if (answer.answerId === answer.correctAnswerNumber) {
        styles[index][answer.answerId] = "#94D7A2";
        correctAnswersCounter += 1;
      } else {
        styles[index][answer.answerId] = "#F8BCBC";
        styles[index][answer.correctAnswerNumber] = "#94D7A2";
      }
    });
    setCorrectAnswers(correctAnswersCounter);
    setAnswersStyles(styles);
  }

  function selectAnswer(answerId, questionId, correctAnswerId, isCorrect) {
    const newAnswer = answersData.map(function (answer) {
      if (answer.questionId === questionId) {
        return {
          questionId: questionId,
          answerId: answerId,
          correctAnswerNumber: correctAnswerId,
          isCorrectAnswer: isCorrect,
        };
      } else {
        return answer;
      }
    });

    const setNewStyle = answersStyles.map(function (style, index) {
      const cleanStyle = { 1: "none", 2: "none", 3: "none", 4: "none" };
      if (index === questionId - 1) {
        const newStyle = {
          ...cleanStyle,
          [answerId]: "#D6DBF5",
        };
        return newStyle;
      } else {
        return cleanStyle;
      }
    });
    setAnswersStyles(setNewStyle);
    setAnswersData(newAnswer);
  }

  function resetGameFunction() {
    setTriviaData([]);
    setAnswersData([]);
    setAnswersStyles([
      { 1: "none", 2: "none", 3: "none", 4: "none" },
      { 1: "none", 2: "none", 3: "none", 4: "none" },
      { 1: "none", 2: "none", 3: "none", 4: "none" },
      { 1: "none", 2: "none", 3: "none", 3: "none" },
      { 1: "none", 2: "none", 3: "none", 4: "none" },
    ]);
    setCorrectAnswers(null);
    setResetGame((prevGameState) => !prevGameState);
  }

  useEffect(() => {
    async function getTriviaData() {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=5");
        if (!res.ok) {
          throw new Error(`Error:${response.status}`);
        }
        const data = await res.json();
        setTriviaData(cleanData(data));
      } catch (error) {
        console.error(`Could not get trivia data: ${error}`);
      }
    }

    function cleanData(retrievedData) {
      const cleanedTriviaData = retrievedData.results.map(function (
        data,
        index
      ) {
        const answers = [
          { answer: decodeHtml(data.incorrect_answers[0]), isCorrect: false },
          { answer: decodeHtml(data.incorrect_answers[1]), isCorrect: false },
          { answer: decodeHtml(data.incorrect_answers[2]), isCorrect: false },
          { answer: decodeHtml(data.correct_answer), isCorrect: true },
        ];

        const shuffledAnswers = [];

        while (answers.length > 0) {
          const randomIndex = Math.floor(Math.random() * answers.length);
          shuffledAnswers.push(answers[randomIndex]);
          answers.splice(randomIndex, 1);
        }

        return {
          id: index + 1,
          question: decodeHtml(data.question),
          answer1: shuffledAnswers[0],
          answer2: shuffledAnswers[1],
          answer3: shuffledAnswers[2],
          answer4: shuffledAnswers[3],
        };
      });

      return cleanedTriviaData;
    }

    getTriviaData();
  }, [resetGame]);

  useEffect(() => {
    setAnswersData(
      triviaData.map(function (questionData) {
        return {
          questionId: questionData.id,
          answerId: 5,
          correctAnswerNumber: 0,
          isCorrectAnswer: 0,
        };
      })
    );
  }, [triviaData]);

  function startQuiz() {
    setShowIntro(false);
  }

  return (
    <div className="container">
      {showIntro && (
        <div className="container-intro">
          <h1 className="intro-title">Quizzical</h1>
          <h3 className="intro-subtitle">The magic of quizes</h3>
          <button className="intro-start-button" onClick={startQuiz}>
            Start quiz
          </button>
        </div>
      )}
      {!showIntro && (
        <main className="container-questions">
          {triviaData.map((questionData) => (
            <Question
              key={questionData.id}
              trivia={questionData}
              selectAnswer={selectAnswer}
              answersData={answersData}
              answersStyles={answersStyles}
            />
          ))}
        </main>
      )}
      {!showIntro && !correctAnswers && (
        <button className="check-answers-button" onClick={applyStyles}>
          Check answers
        </button>
      )}
      {!showIntro && correctAnswers && (
        <div className="end-game">
          <h3 className="score">
            You scored {correctAnswers}/5 correct answers
          </h3>
          <button className="play-again-button" onClick={resetGameFunction}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
