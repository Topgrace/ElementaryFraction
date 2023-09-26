import React, { useState } from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import styles from './DN_findingQuiz.module.css';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let questionsData = [
  { numerator: 2, denominator: 5, answer: 'd' },
  { numerator: 3, denominator: 8, answer: 'd' },
  { numerator: 2, denominator: 4, answer: 'd' },
  { numerator: 1, denominator: 3, answer: 'd' },
  { numerator: 0, denominator: 7, answer: 'd' },
  { numerator: 3, denominator: 7, answer: 'd' },
  { numerator: 9, denominator: 2, answer: 'd' },
  { numerator: 4, denominator: 1, answer: 'd' },
  { numerator: 2, denominator: 15, answer: 'd' },
  { numerator: 3, denominator: 4, answer: 'd' },
  { numerator: 5, denominator: 10, answer: 'd' },
  { numerator: 0, denominator: 5, answer: 'd' },
  { numerator: 9, denominator: 4, answer: 'd' },
  { numerator: 8, denominator: 3, answer: 'd' },
  { numerator: 4, denominator: 7, answer: 'd' },
  { numerator: 3, denominator: 10, answer: 'n' },
  { numerator: 3, denominator: 5, answer: 'n' },
  { numerator: 9, denominator: 1, answer: 'n' },
  { numerator: 0, denominator: 1, answer: 'n' },
  { numerator: 10, denominator: 100, answer: 'n' },
  { numerator: 2, denominator: 6, answer: 'n' },
  { numerator: 1, denominator: 8, answer: 'n' },
  { numerator: 25, denominator: 50, answer: 'n' },
  { numerator: 10, denominator: 20, answer: 'n' },
  { numerator: 15, denominator: 16, answer: 'n' },
  { numerator: 1, denominator: 4, answer: 'n' },
  { numerator: 1, denominator: 78, answer: 'n' },
  { numerator: 2, denominator: 3, answer: 'n' },
  { numerator: 5, denominator: 25, answer: 'n' },
  { numerator: 2, denominator: 5, answer: 'n' },

  // 여기에 더 많은 문제를 추가할 수 있습니다.
];

questionsData = shuffleArray(questionsData);

const DN_findingQuiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [questions, setQuestions] = useState(questionsData);

  // 현재 문제
  const currentQuestion = questions[currentIndex];

  // 스타일 설정

  return (
    <div className={styles.quizContainer}>
      <h2>
        다음 분수의 {currentQuestion.answer === 'd' ? '분모' : '분자'}를
        고르시오
      </h2>
      <div style={{ display: 'inline-block' }}>
        <div
          className={`${styles.box}  ${
            'n' === selectedOption ? styles.boxSelected : styles.boxDefault
          }`}
          onClick={() => setSelectedOption('n')}
        >
          <InlineMath>{currentQuestion.numerator.toString()}</InlineMath>
        </div>
        <hr className={styles.hrStyle} />
        <div
          className={`${styles.box}  ${
            'd' === selectedOption ? styles.boxSelected : styles.boxDefault
          }`}
          onClick={() => setSelectedOption('d')}
        >
          <InlineMath>{currentQuestion.denominator.toString()}</InlineMath>
        </div>
      </div>

      {/* 이전/다음 버튼 */}
      <div className={styles.directionButtons}>
        <button
          onClick={() => {
            setCurrentIndex((prev) => prev - 1);
          }}
          className={styles.previousButton}
          disabled={currentIndex === 0}
        >
          이전
        </button>

        <span>
          {' '}
          {currentIndex + 1} / {questions.length}{' '}
        </span>
        
        <button
            onClick={() => {
              setCurrentIndex((prev) => prev + 1), setSelectedOption('');
            }}
            className={styles.nextButton}
            disabled={currentIndex + 1 === questions.length}
          >
            다음
          </button>        
      </div>

      {/* 정답 체크 */}
      <p>
        {selectedOption &&
          (selectedOption === currentQuestion.answer
            ? '정답입니다!'
            : selectedOption !== currentQuestion.answer
            ? '틀렸습니다. 다시 시도해 보세요.'
            : '')}
      </p>
    </div>
  );
};

export default DN_findingQuiz;
