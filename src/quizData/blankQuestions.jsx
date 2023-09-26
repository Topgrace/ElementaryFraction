import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const questions = [
  {
    question1: (
      <>
        <InlineMath>{`\\dfrac{2}{10}`}</InlineMath>의 분모는{' '}
      </>
    ),
    question2: ' 입니다.',
    answer: '10',
  },
  {
    question1: (
      <>
        <InlineMath>{`\\dfrac{9}{8}`}</InlineMath>의 분모는{' '}
      </>
    ),
    question2: ' 입니다.',
    answer: '8',
  },
  {
    question1: (
      <>
        <InlineMath>{`\\dfrac{1}{4}`}</InlineMath>의 분모는{' '}
      </>
    ),
    question2: ' 입니다.',
    answer: '4',
  },
  {
    question1: (
      <>
        <InlineMath>{`\\dfrac{5}{8}`}</InlineMath>의 분자는{' '}
      </>
    ),
    question2: ' 입니다.',
    answer: '5',
  },
  {
    question1: (
      <>
        <InlineMath>{`\\dfrac{2}{10}`}</InlineMath>의 분자는{' '}
      </>
    ),
    question2: ' 입니다.',
    answer: '2',
  },
  {
    question1: (
      <>
        <InlineMath>{`\\dfrac{5}{4}`}</InlineMath>의 분자는{' '}
      </>
    ),
    question2: ' 입니다.',
    answer: '5',
  },
  {
    question1: (
      <>
        <InlineMath>{`\\dfrac{5}{10}`}</InlineMath>의 분모는{' '}
      </>
    ),
    question2: ' 입니다.',
    answer: '10',
  },
  {
    question1: (
      <>
        <InlineMath>{`\\dfrac{29}{358}`}</InlineMath>의 분자는{' '}
      </>
    ),
    question2: ' 입니다.',
    answer: '29',
  },
  {
    question1: (
      <>
        <InlineMath>{`\\dfrac{15}{20}`}</InlineMath>의 분모는{' '}
      </>
    ),
    question2: ' 입니다.',
    answer: '20',
  },
  {
    question1: (
      <>
        <InlineMath>{`\\dfrac{7}{8}`}</InlineMath>의 분모는{' '}
      </>
    ),
    question2: ' 입니다.',
    answer: '8',
  },
  {
    question1: (
      <>
        <InlineMath>{`\\dfrac{42}{39}`}</InlineMath>의 분자는{' '}
      </>
    ),
    question2: ' 입니다.',
    answer: '42',
  },
  {
    question1: (
      <>
        <InlineMath>{`\\dfrac{0}{3}`}</InlineMath>의 분자는{' '}
      </>
    ),
    question2: ' 입니다.',
    answer: '0',
  },

  // 추가적인 문제들...
];
export default questions;
