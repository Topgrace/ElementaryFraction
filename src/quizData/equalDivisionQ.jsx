//import 'katex/dist/katex.min.css';
//import Latex from 'react-latex-next';
import img0 from '../assets/imgSelection/등분0.png';
import img1 from '../assets/imgSelection/등분1.png';
import img2 from '../assets/imgSelection/등분2.png';
import img3 from '../assets/imgSelection/등분3.png';

const quizQuestions=[
  {
    type:'imgSelect',
    shuffle: true,
    question: "크기를 똑같이 나눈 것을 고르시오",
    options: [{imageSrc: img0, alt:'img0'}, {imageSrc: img1, alt:'img1'},{imageSrc: img2, alt:'img2'},{imageSrc: img3, alt:'img3'}],
    correctAnswers: [0],
  },
  
];

export default quizQuestions;