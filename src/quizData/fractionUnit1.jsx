import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

const quizQuestions=[
  {
    type:'multiple',
    shuffle: true,
    question: <>다음 중 분수를 <b><u>모두</u></b> 고르시오</>,
    options: [<Latex>$\dfrac25$</Latex>, 17, 101,<Latex>{"$\\dfrac{1}{3}$"}</Latex>,0],
    correctAnswers: [0,3],
  },
  {
    type:'multiple',
    question: <>다음 중 분수를 <b><u>모두</u></b> 고르시오</>,
    options: [3, 
      <Latex>$\dfrac12$</Latex>,
    1,<Latex>$\dfrac21$</Latex>,'가'],
    correctAnswers: [1,3],
  },
  {
    type:'multiple',
    question:  <>다음 중 분수를 <b><u>모두</u></b> 고르시오</>,
    options: [5, 
      <Latex>$\dfrac05$</Latex>,
    '+', 48, <Latex>$\dfrac27$</Latex>],
    correctAnswers: [1,4],
  },
  {
    type:'multiple',
    question: 
    <>다음 중 분수가 아닌 것을 <b><u>모두</u></b> 고르시오</>
      ,
    options: [<Latex >{"$\\dfrac{2}{10}$"}</Latex>, 
    <Latex>{"$\\dfrac{3}{8}$"}</Latex>,
    91,<Latex>{"$\\dfrac{0}{1}$"}</Latex>,100
    ],
    correctAnswers: [2,4],
  },
  {
    type:'multiple',
    question: 
    <>다음 중 분수가 아닌 것을 <b><u>모두</u></b> 고르시오</>,
    options: [<Latex>2</Latex>, 
    <Latex>{"$\\dfrac{1}{8}$"}</Latex>,
    <Latex>{"$\\dfrac{16}{50}$"}</Latex>,222,<Latex>{"$\\dfrac{15}{14}$"}</Latex>
    ],
    correctAnswers: [0,3],
  },
  {
    type:'multiple',
    question: 
    <>다음 중 분수가 아닌 것을 <b><u>모두</u></b> 고르시오</>,
    options: [<Latex>{"$\\dfrac{1}{4}$"}</Latex>, 
    <Latex>{"$\\dfrac{1}{10}$"}</Latex>,
    <Latex>{"$\\dfrac{2}{3}$"}</Latex>,5,<Latex>{"$\\dfrac{7}{0}$"}</Latex>
    ],
    correctAnswers: [3,4],
  },
];

export default quizQuestions;