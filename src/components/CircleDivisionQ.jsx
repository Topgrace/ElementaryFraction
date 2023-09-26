import { useState, useCallback, useRef } from 'react';
import styles from './CircleDivisionQ.module.css';
import PropTypes from 'prop-types';
import clsx from 'clsx';
CircleDivisionQ.propTypes={
  dotsN:PropTypes.number.isRequired,
  centerDot:PropTypes.string.isRequired,
  width:PropTypes.string.isRequired,
  height:PropTypes.string.isRequired,
  radius:PropTypes.number.isRequired
  };
export default function CircleDivisionQ(props) {
  const [lines, setLines] = useState([]);
  const [activePoint, setActivePoint] = useState(null);
  const [activeCircleIndex, setActiveCircleIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const svgRef = useRef();

  const snapDistance = 20; // The distance within which to snap to a point
  const handleMouseSnapping = useCallback(
    (e) => {
      const svgRect = svgRef.current.getBoundingClientRect();
      let x = e.clientX - svgRect.left;
      let y = e.clientY - svgRect.top;

      // Get all circles
      const circles = Array.from(svgRef.current.querySelectorAll('circle'));
      //let newNearbyIndices = [];
      for (let i = 0; i < circles.length; i++) {
        const cx = parseInt(circles[i].getAttribute('cx'));
        const cy = parseInt(circles[i].getAttribute('cy'));
        const dx = cx - x;
        const dy = cy - y;
        const distanceSquared = dx * dx + dy * dy;

        if (distanceSquared < snapDistance * snapDistance) {
          x = cx;
          y = cy;
          break;
        } else {
          //
        }
      }

      setMousePosition({ x, y });
    },
    [svgRef]
  );

  const handleDotClick = useCallback(
    (e, point, i) => {
      //e.preventDefault();
      //console.log(e) ;
      //console.log("activeP",activePoint);
      if (activePoint) {
        //활성화된 시작점이 있을시
        const newLine = {
          start: { ...activePoint, index: activeCircleIndex },
          end: { ...point, index: i },
        };
        // Check if the line is already in the array(선분중복제거)
        const lineExists = lines.some(
          (line) =>
            (line.start.index === newLine.start.index &&
              line.end.index === newLine.end.index) ||
            (line.start.index === newLine.end.index &&
              line.end.index === newLine.start.index)
        );
        if (!lineExists) {
          setLines([...lines, newLine]);
        }
        setActivePoint(null);
        setActiveCircleIndex(null);
        setDisplayAnswer(false);
      } else {
        //console.log("activeP",activePoint,point);
        setActivePoint(point);
        //console.log("activeP",activePoint);
        setActiveCircleIndex(i);
        setDisplayAnswer(false);
      }
    },
    [activePoint]
  );

  const handleDotMouseDown = useCallback(
    (e, point, i) => {      
      e.stopPropagation(); //svg onMouseDown 버블링 방지
      if (activePoint) {
        const newLine = {
          start: { ...activePoint, index: activeCircleIndex },
          end: { ...point, index: i },
        };
        // Check if the line is already in the array(선분중복제거)
        const lineExists = lines.some(
          (line) =>
            (line.start.index === newLine.start.index &&
              line.end.index === newLine.end.index) ||
            (line.start.index === newLine.end.index &&
              line.end.index === newLine.start.index)
        );
        if (!lineExists) {
          //기존에 그려진 선분이 아님
          setLines([...lines, newLine]);
          //setActivePoint(null);
          //setActiveCircleIndex(null);
        }
        //setActivePoint(null);
        //setActiveCircleIndex(null);
        setDisplayAnswer(false);
      } //활성화된 점이 없을시
      else {
        setActivePoint(point);
        setActiveCircleIndex(i);
        setDisplayAnswer(false);
      }
    },
    [activePoint]
  );

  const handleDotMouseUp = useCallback(
    (e, point, i) => {
      //e.preventDefault();
      e.stopPropagation();     
      if (activePoint && JSON.stringify(point)!==JSON.stringify(activePoint)) { //활성화점(시작점)과 이벤트점(클릭점)이 다를때만 선분 그리기
        const newLine = {
          start: { ...activePoint, index: activeCircleIndex },
          end: { ...point, index: i },
        };
        // Check if the line is already in the array(선분중복제거)
        const lineExists = lines.some(
          (line) =>
            (line.start.index === newLine.start.index &&
              line.end.index === newLine.end.index) ||
            (line.start.index === newLine.end.index &&
              line.end.index === newLine.start.index)
        );
        if (!lineExists) {
          setLines([...lines, newLine]);
          //setActivePoint(null);
          //setActiveCircleIndex(null);
        }
        setActivePoint(null);
        setActiveCircleIndex(null);
        setDisplayAnswer(false);
      } else {
        setActivePoint(point);
        setActiveCircleIndex(i);
        setDisplayAnswer(false);
      }
    },
    [activePoint]
  );

  const center = { x: props.width / 2, y: props.height / 2 };
  const arrDots = [...Array(props.dotsN)].map((_, i) => {
    let x;
    let y;
    if (props.centerDot) {
      if (i < props.dotsN - 1) {
        const theta = i * ((2 * Math.PI) / (props.dotsN - 1));
        x = center.x + Math.cos(theta) * props.radius;
        y = center.y + Math.sin(theta) * props.radius;
      } else {
        x = center.x; // center point
        y = center.y;
      }
    } else {
      const theta = (i * (2 * Math.PI)) / props.dotsN;
      x = center.x + Math.cos(theta) * props.radius;
      y = center.y + Math.sin(theta) * props.radius;
    }
    //function testhandle(){handleDotClick({ x, y }, i)};
    return (
      <g className={styles.circleGroup} key={`circle_group_${i}`}>
        <circle
          className={clsx(styles.circle, {
            [styles.active]: activeCircleIndex === i,
          })}
          key={i}
          cx={x}
          cy={y}
        />
        <circle //proximity
          //z-index={2}
          key={`clickable_circle_${i}`}
          cx={x}
          cy={y}
          r={snapDistance}
          fillOpacity="0"
          onMouseUp={(e) => handleDotMouseUp(e, { x, y }, i)}
          onMouseDown={(e) => {
            setMousePosition({ x, y });
            handleDotMouseDown(e, { x, y }, i);
          }}         
        />
      </g>
    );
  });

  const checkAnswer = () => {
    setDisplayAnswer((prevDisplay) => !prevDisplay);
    // Extract indices of points (중심점을 포함하는 선분은 다른쪽점 인덱스, 그외는 오답인덱스100)
    const sortedLineIndexs = lines
      .map((line) => {
        if (line.start.x === center.x && line.start.y === center.y)
          return line.end.index;
        else if (line.end.x === center.x && line.end.y === center.y)
          return line.start.index;
        else return 100;
      })
      .sort((a, b) => a - b);

    const correctAnswers = [
      [0, 2, 4],
      [1, 3, 5],
    ];
    // Check if sortedLineIndexs is a correct answer
    for (let i = 0; i < correctAnswers.length; i++) {
      if (
        JSON.stringify(correctAnswers[i]) === JSON.stringify(sortedLineIndexs)
      ) {
        setIsCorrect(true);
        return;
      }
    }
    setIsCorrect(false);
    return;
  };

  const handleSvgClickDown = () => {
    // SVG 영역 클릭(다운 or 업) 시 활성화된 원(점) 비활성화
    if (activePoint) {
      setActivePoint(null);
      setActiveCircleIndex(null);
    }
  };
  return (
    <div
      onMouseDown={handleSvgClickDown}
      onMouseUp={handleSvgClickDown}
      className={styles.quizContainer}
    >
      <h2>주어진 그림을 3등분 하시오.</h2>
      <svg
        ref={svgRef}
        className={`${
          activeCircleIndex !== null
            ? styles.containerActive
            : styles.containerDefault
        }`}
        height={props.height}
        width={props.width}
        onMouseMove={activePoint ? (e) => handleMouseSnapping(e) : undefined} //
      >
        <circle cx={center.x} cy={center.y} r={props.radius} fill="#edaef4" />
        {lines.map((line, i) => (
          <g className={styles.lineGroup} key={`line_group_${i}`}>
            <line
              className={activePoint ? styles.inactiveLine : styles.line}
              key={`line_${i}`}
              x1={line.start.x}
              y1={line.start.y}
              x2={line.end.x}
              y2={line.end.y}
            />
            <line //proximity
              key={`clickable_line_${i}`}
              x1={line.start.x}
              y1={line.start.y}
              x2={line.end.x}
              y2={line.end.y}
              strokeWidth="20"
              strokeOpacity="0"
              stroke="blue"
              onClick={() => {
                if (!activePoint) {
                  const newLines = lines.filter((_, index) => index !== i);
                  setLines(newLines);
                  setDisplayAnswer(false);
                }
              }}
            />
          </g>
        ))}
        {activePoint && (
          <line
            x1={activePoint.x}
            y1={activePoint.y}
            x2={mousePosition.x}
            y2={mousePosition.y}
            stroke="red"
            strokeWidth="3"
            strokeDasharray="10 10"
          />
        )}
        {arrDots}
      </svg>
      <br />
      <button
        onClick={checkAnswer}
        disabled={lines.length === 0}
        className={styles.submitButton}
      >
        답안제출
      </button>
      {displayAnswer && (
        <div>
          <p className={isCorrect ? styles.correctAnswer : styles.wrongAnswer}>
            {isCorrect ? '정답입니다!' : '틀렸습니다.'}
          </p>
        </div>
      )}
    </div>
  );
}
