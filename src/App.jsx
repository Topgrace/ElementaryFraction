
import Welcome from "./components/Welcome";
import QuizComponent from "./components/QuizComponent";
import testQuestions from './quizData/fractionUnit1';
import equalDivisionQ from './quizData/equalDivisionQ';
import DN_findingQuiz from './components/DN_findingQuiz';
import BlankFillingQuiz from './components/BlankFillingQuiz';
import blankQuestions from './quizData/blankQuestions';
import FractionBasketGame from './components/FractionBasketGame';
import CircleDivisionQ from './components/CircleDivisionQ';
import RectDivisionQ from './components/RectDivisionQ';
import "./css/main.css";

export default function App() {

  return (
  <>
  <Welcome/>
  <h2>1.분수의 생김새</h2>
  <QuizComponent quizQuestions={testQuestions} /><br/>
  <h2>2.분수의 용어</h2>
  <DN_findingQuiz /><br/>
  <h2>개념다지기</h2>
  <BlankFillingQuiz questions={blankQuestions}/>
  <br />
  <FractionBasketGame targetScore={500}/><br/>
  <h2>4.하나를 등분하기</h2>
  <QuizComponent quizQuestions={equalDivisionQ} /><br/>
  <CircleDivisionQ
        dotsN={7}
        centerDot="true"
        height="500"
        width="500"
        radius={150}
      /><br/>
  <RectDivisionQ dotsN={8} width='500' height='500'/>
  </>
  );
  }