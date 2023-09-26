import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './FractionBasketGame.module.css';
import imgMinions from '../assets/fractionBasket.png';
import imgBanana from '../assets/banana.png';

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  // 문자열로 변환하고, 두 자리수를 유지하기 위해 앞에 '0'을 추가한다.
  // 예: '1' -> '01', '10' -> '10'
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};

function getType(target) {
  return Object.prototype.toString.call(target).slice(8, -1);
}
function isObject(target) {
  return getType(target) === 'Object';
}
function getRandomFraction() {
  const numerator = Math.floor(Math.random() * 11); // 분자: 0~10 사이의 랜덤 정수
  const denominator = Math.floor(Math.random() * 10) + 1; // 분모: 1~10 사이의 랜덤 정수
  const fraction = {
    numerator: numerator,
    denominator: denominator,
  };
  //return `${numerator}/${denominator}`;
  return fraction;
}
function getFakeFraction() {
  //분모가 0인 형태
  const numerator = Math.floor(Math.random() * 11); // 분자: 0~10 사이의 랜덤 정수
  const denominator = 0;
  const fraction = {
    numerator: numerator,
    denominator: denominator,
  };
  //return `${numerator}/${denominator}`;
  return fraction;
}
function getRandomNaturalNumber() {
  return Math.floor(Math.random() * 100) + 1; // 자연수: 1~100 사이의 랜더 정수
}
function getRandomString(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
function getRandomTarget() {
  const randomChoice = Math.floor(Math.random() * 4);
  let target;
  if (randomChoice === 0) target = getRandomFraction();
  else if (randomChoice === 1) target = getRandomNaturalNumber().toString();
  else if (randomChoice === 3) target = getRandomString(3);
  else target = getFakeFraction();
  return target;
}

export default function CanvasGame(props) {
  const [state, setState] = useState('stop');
  const [score, setScore] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    let timer;

    if (state === 'play') {
      // 게임이 시작되면 타이머 시작
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (state === 'stop') {
      // 게임이 종료되면 타이머 초기화
      setElapsedTime(0);
    } else if (state === 'pause') {
      // 게임이 일시정지 되면 타이머 중지
      clearInterval(timer);
    }

    return () => clearInterval(timer); // 컴포넌트가 언마운트될 때 인터벌 제거
  }, [state]);

  // 점수가 변경될 때마다 실행되는 useEffect 훅
  useEffect(() => {
  // 목표 점수를 넘었으면 게임 종료
  if (score >= props.targetScore) {
    alert('게임 클리어!');
    setState('stop');
  }
  }, [score]); // score 값이 변경될 때마다 이 훅을 실행

  const ref = useRef(null);
  const minionRef = useRef(null);

  const bananaRef = useRef(null);
  const bananaSizeRef = useRef({ w: 100, h: 100 });
  const posRef = useRef({
    bananas: [],
    bananaAccel: [],
    minion: { x: 0, y: 0, w: 0, h: 0 },
  });

  const keyRef = useRef({
    isLeft: false,
    isRight: false,
  });
  const drawImage = useCallback((ctx, img, { x, y, w, h }) => {
    ctx.drawImage(img, x, y, w, h);
  }, []);
  const drawText = useCallback((ctx, text, { x, y }) => {
    ctx.font = '30px Arial'; // 원하는 폰트와 크기 설정
    ctx.fillStyle = 'black';
    ctx.fillText(text, x, y);
  }, []);
  const drawFraction = useCallback((ctx, fraction, { x, y }) => {
    ctx.font = '30px Arial'; // 원하는 폰트와 크기 설정
    ctx.fillStyle = 'black';
    const n = fraction.numerator.toString();
    const d = fraction.denominator.toString();
    if (n === '10') {
      ctx.fillText(n, x - 10, y);
    } else ctx.fillText(n, x, y);
    ctx.beginPath();
    ctx.moveTo(x - 5, y + 5);
    ctx.lineWidth = 5;
    ctx.lineTo(x + 20, y + 5);
    ctx.stroke(); //분수의 가운데 선 그리기
    if (d === '10') {
      ctx.fillText(d, x - 10, y + 30);
    } else ctx.fillText(d, x, y + 30);
  }, []);
  const drawFakeFraction = useCallback((ctx, fraction, { x, y }) => {
    ctx.font = '30px Arial'; // 원하는 폰트와 크기 설정
    ctx.fillStyle = 'red';
    const n = fraction.numerator.toString();
    const d = fraction.denominator.toString();
    if (n === '10') {
      ctx.fillText(n, x - 10, y);
    } else ctx.fillText(n, x, y);
    ctx.beginPath();
    ctx.moveTo(x - 5, y + 5);
    ctx.lineWidth = 5;
    ctx.lineTo(x + 20, y + 5);
    ctx.stroke(); //분수의 가운데 선 그리기
    ctx.fillText(d, x, y + 30);
  }, []);

  const loadImage = useCallback(
    (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
      }),
    []
  );
  const blockOverflowPos = useCallback((pos) => {
    pos.x = pos.x + pos.w >= W ? W - pos.w : pos.x < 0 ? 0 : pos.x;
    pos.y = pos.y + pos.h >= H ? H - pos.h : pos.y < 0 ? 0 : pos.y;
  }, []);

  const updateMinionPos = useCallback(
    (minionPos) => {
      const key = keyRef.current;
      if (key.isLeft) minionPos.x -= VELOCITY.minion.left;
      if (key.isRight) minionPos.x += VELOCITY.minion.right;
      blockOverflowPos(minionPos);
    },
    [blockOverflowPos]
  );
  const createBanana = useCallback(() => {
    if (!bananaRef.current) return;
    const size = bananaSizeRef.current;
    let target; //
    target = getRandomTarget(); //
    posRef.current.bananas.push(
      Object.assign(
        Object.assign({ x: Math.random() * (W - size.w), y: -size.h }, size),
        { target }
      )
    );
    posRef.current.bananaAccel.push(1);
  }, []);
  const updateBananaPos = useCallback((bananaPos, index) => {
    const y = bananaPos.y;
    const accel = posRef.current.bananaAccel[index];
    posRef.current.bananaAccel[index] = accel + accel * VELOCITY.bananaAccel;
    bananaPos.y = y + accel;
  }, []);
  const deleteBanana = useCallback((index) => {
    posRef.current.bananas.splice(index, 1);
    posRef.current.bananaAccel.splice(index, 1);
  }, []);
  const catchBanana = useCallback(
    (bananaPos, index) => {
      const minionPos = posRef.current.minion;
      if (
        minionPos.x + minionPos.w >= bananaPos.x &&
        minionPos.x <= bananaPos.x + bananaPos.w &&
        minionPos.y + minionPos.h >= bananaPos.y &&
        minionPos.y <= bananaPos.y + bananaPos.h
      ) {
        deleteBanana(index);
        if (isObject(bananaPos.target)) {
          //분수만 담을때 점수 올리기
          if (bananaPos.target.denominator === 0)
            //분모0인것 벌점2배
            setScore((prevScore) => prevScore - 2 * BANANA_SCORE);
          else {
            setScore((prevScore) =>prevScore + BANANA_SCORE);
          }
        } else setScore((prevScore) => prevScore - BANANA_SCORE);
      }
    },
    [deleteBanana]
  );
  const initialGame = useCallback((ctx) => {
    ctx.clearRect(0, 0, W, H);
    const { w, h } = posRef.current.minion;
    posRef.current.bananaAccel = [];
    posRef.current.bananas = [];
    posRef.current.minion = {
      //바구니처음위치
      x: W / 2 - w / 2,
      y: H - h,
      w,
      h,
    };
    keyRef.current.isLeft = false;
    keyRef.current.isRight = false;
    setScore(0);
  }, []);

  useEffect(() => {
    const cvs = ref.current;
    const ctx = cvs === null || cvs === void 0 ? void 0 : cvs.getContext('2d');
    state === 'stop' && ctx && initialGame(ctx);
    if (!cvs || !ctx || state !== 'play') return;
    !minionRef.current &&
      loadImage(imgMinions).then((img) => {
        minionRef.current = img;
        //const w = img.width / 4;
        //const h = img.height / 4;
        const w = W / 5; //게임영역비율 크기
        const h = H / 5;
        posRef.current.minion = {
          x: W / 2 - w / 2,
          y: H - h,
          w,
          h,
        };
      });
    !bananaRef.current &&
      loadImage(imgBanana).then((img) => {
        bananaRef.current = img;
        bananaSizeRef.current.w = img.width;
        bananaSizeRef.current.h = img.height;
      });
    let timer;
    let rafTimer;
    const pos = posRef.current;
    const animate = () => {
      const minion = minionRef.current;
      const banana = bananaRef.current;
      ctx.clearRect(0, 0, W, H);
      if (minion) {
        updateMinionPos(pos.minion);
        drawImage(ctx, minion, pos.minion);
      }
      if (banana) {
        pos.bananas.forEach((bananaPos, index) => {
          updateBananaPos(bananaPos, index);
          //drawImage(ctx, banana, bananaPos);
          //drawText(ctx, bananaPos.text, bananaPos);
          if (isObject(bananaPos.target)) {
            if (bananaPos.target.denominator === 0)
              drawFakeFraction(ctx, bananaPos.target, bananaPos);
            else drawFraction(ctx, bananaPos.target, bananaPos);
          } else drawText(ctx, bananaPos.target, bananaPos);
        });
        pos.bananas.forEach((bananaPos, index) => {
          if (bananaPos.y >= H) {
            deleteBanana(index);
          } else {
            catchBanana(bananaPos, index);
          }
        });
      }
      rafTimer = requestAnimationFrame(animate);
    };
    rafTimer = requestAnimationFrame(animate);
    timer = window.setInterval(createBanana, CREATE_BANANA_TIME);
    const onKeyDown = (e) => {
      const key = e.key.toLowerCase();
      keyRef.current.isLeft = key === 'a' || key === 'arrowleft';
      keyRef.current.isRight = key === 'd' || key === 'arrowright';
    };
    const onKeyUp = () => {
      keyRef.current.isLeft = false;
      keyRef.current.isRight = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      timer && window.clearInterval(timer);
      timer = undefined;
      rafTimer && cancelAnimationFrame(rafTimer);
      rafTimer = undefined;
    };
  }, [
    drawImage,
    drawText,
    drawFraction,
    drawFakeFraction,
    loadImage,
    updateMinionPos,
    createBanana,
    updateBananaPos,
    deleteBanana,
    catchBanana,
    state,
    initialGame,
  ]);
  return (
    <div className={styles.gameContainer}>
      <h2>분수만 담으세요</h2>
      <div style={{ margin: '10px auto', textAlign: 'center' }}>
        <button type="button" onClick={() => setState('pause')}>
          PAUSE
        </button>
        <button type="button" onClick={() => setState('play')}>
          PLAY
        </button>
        <button type="button" onClick={() => setState('stop')}>
          STOP
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>현재 점수: {score}</p>
          <p>경과 시간: {formatTime(elapsedTime)}</p>
        </div>
      </div>
      <canvas
        className={styles.gameArea}
        ref={ref}
        width={W}
        height={H}
        style={{
          display: 'block',
          margin: '0 auto',
          border: 'solid 1px black',
        }}
      />
    </div>
  );
}
const W = 600;
const H = 600;
const VELOCITY = {
  minion: {
    left: 6,
    right: 6,
  },
  bananaAccel: 0.02,
};
const CREATE_BANANA_TIME = 500;
const BANANA_SCORE = 50;
