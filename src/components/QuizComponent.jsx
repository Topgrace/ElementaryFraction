import { useState } from "react";
import styles from "./QuizComponent.module.css";

const QuizQuestion = (props) => {
  const { question, options, type } = props.question;
  const onSubmit = props.onSubmit;
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleClickOption = (option) => {
    if (type === "multiple" || type==='imgSelect') {
      setSelectedOptions((prevSelectedOptions) =>
        prevSelectedOptions.includes(option)
          ? prevSelectedOptions.filter((opt) => opt !== option)
          : [...prevSelectedOptions, option]
      );
    } else {
      setSelectedOptions([option]);
    }
  };

  const handleSubmit = () => {
    onSubmit(selectedOptions);
  };

  const renderOption = (option, index) => (
    <button
      key={index}
      onClick={() => handleClickOption(option)}
      isSelectedOption={selectedOptions.includes(option) ? "true" : "false"}
      className={styles.optionButton}
    >
      {(type!=='imgSelect') && option}
      {(type==='imgSelect') && <img src={option.imageSrc} alt={option.alt}/>}
    </button>
  );

  return (
    <div>
      <h2>{question}</h2>
      <div>{options.map(renderOption)}</div>
      <button
        onClick={handleSubmit}
        disabled={selectedOptions.length === 0}
        className={styles.submitButton}
      >
        답변체크
      </button>
    </div>
  );
};

export default function QuizComponent(props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const totalQuestions = props.quizQuestions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const onCheckAnswer = (selectedOptions) => {
    const answerIndexes = selectedOptions.map((option) =>
      props.quizQuestions[currentQuestionIndex].options.indexOf(option)
    );
    setSelectedAnswer(answerIndexes);
    setDisplayAnswer(true);
    // setTimeout(() => {
    //   setDisplayAnswer(false);
    // }, 2000);
  };

  const onPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setDisplayAnswer(false);
    }
  };

  const onNextQuestion = () => {
    if (currentQuestionIndex < props.quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setDisplayAnswer(false);
    }
  };

  const isCorrect =
    selectedAnswer !== null &&
    JSON.stringify(selectedAnswer.sort()) ===
      JSON.stringify(
        props.quizQuestions[currentQuestionIndex].correctAnswers.sort()
      );

  return (
    <div className={styles.quizContainer}> 
      <QuizQuestion
        key={currentQuestionIndex}
        question={props.quizQuestions[currentQuestionIndex]}
        onSubmit={onCheckAnswer}
      />

      {displayAnswer && (
        <div>
          <p className={ isCorrect ? styles.correctAnswer : styles.wrongAnswer}>
            <p className={styles.animatedText}>
              {isCorrect ? "정답입니다!" : "틀렸습니다."}
            </p>
          </p>
        </div>
      )}

      <div className={styles.directionButtons}>
        <button
          onClick={onPreviousQuestion}
          disabled={isFirstQuestion}
          className={styles.previousButton}
        >
          이전 문제
        </button>

        <button
          onClick={onNextQuestion}
          disabled={isLastQuestion}
          className={styles.nextButton}
        >
          다음 문제
        </button>
      </div>
    </div>
  );
}
