import React, { useState } from 'react';
import "katex/dist/katex.min.css";
import styles from "./DN_findingQuiz.module.css";

const BlankFillingQuiz = ({questions}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [isCorrect, setIsCorrect] = useState(null); 

  const checkAnswer = (event) => {
    event.preventDefault();
    if (answers[currentQuestionIndex].toLowerCase() === questions[currentQuestionIndex].answer.toLowerCase()) {
      setIsCorrect(true);
    } else {
       setIsCorrect(false);
     }   
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

   const goToNextQuestion = () => {
     if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1);
     setIsCorrect("");
   };

return (
<div className={styles.quizContainer}>
<h2>빈칸에 알맞은 수를 쓰시오</h2>

<form onSubmit={checkAnswer}>
<p>{questions[currentQuestionIndex].question1}
<input
type="text"
value={answers[currentQuestionIndex]}
onChange={(e) =>
setAnswers(prevState =>
[...prevState.slice(0,
currentQuestionIndex),
e.target.value,
...prevState.slice(currentQuestionIndex +1)]
)}
size={questions[currentQuestionIndex].answer.length}
/>

{questions[currentQuestionIndex].question2}
</p>

{/*<button onClick="submit">정답 확인</button>*/}</form>
{isCorrect === true && <p>정답입니다!</p>}
{isCorrect === false && (
<p>틀렸습니다. 다시 시도해보세요.</p>
)}

<div className={styles.directionButtons}>
<button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}
className={styles.previousButton}>이전</button>
<p>{currentQuestionIndex + 1} / {questions.length}</p>
<button onClick={goToNextQuestion} disabled={currentQuestionIndex === questions.length - 1}
className={styles.nextButton}>다음</button></div>
</div>
);

};

export default BlankFillingQuiz;