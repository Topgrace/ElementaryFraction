import { useState, useCallback, useRef } from 'react';
import styles from './RectDivisionQ.module.css';
import PropTypes from 'prop-types';
import clsx from 'clsx';
RectDivisionQ.propTypes={
  dotsN:PropTypes.number.isRequired,  
  width:PropTypes.string.isRequired,
  height:PropTypes.string.isRequired, 
  };
export default function RectDivisionQ(props) {
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
        }
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
      if (
        activePoint &&
        JSON.stringify(point) !== JSON.stringify(activePoint)
      ) {
        //활성화점(시작점)과 이벤트점(클릭점)이 다를때만 선분 그리기
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

    if (props.dotsN === 4) {
      // If there are four points
      switch (i) {
        case 0: // top left
          x = center.x - props.width / 4;
          y = center.y - props.height / 4;
          break;
        case 1: // top right
          x = center.x + props.height / 4;
          y = center.y - props.height / 4;
          break;
        case 2: // bottom right
          x = center.x + props.height / 4;
          y = center.y + props.height / 4;
          break;
        case 3: // bottom left
          x = center.x - props.height / 4;
          y = center.y + props.height / 4;
          break;
        default:
        // If more than four points are needed, you can add more cases.
      }
    } else if (props.dotsN === 8) {
      // If there are four points
      switch (i) {
        case 0: // top left
          x = center.x - props.width / 4;
          y = center.y - props.height / 4;
          break;
        case 1: // top right
          x = center.x + props.height / 4;
          y = center.y - props.height / 4;
          break;
        case 2: // bottom right
          x = center.x + props.height / 4;
          y = center.y + props.height / 4;
          break;
        case 3: // bottom left
          x = center.x - props.height / 4;
          y = center.y + props.height / 4;
          break;
        case 4: // 위변가운데
          x = center.x;
          y = center.y - props.height / 4;
          break;
        case 5: // 오른변가운데
          x = center.x + props.height / 4;
          y = center.y;
          break;
        case 6: // 아래변가운데
          x = center.x;
          y = center.y + props.height / 4;
          break;
        case 7: // 아래변가운데
          x = center.x - props.width / 4;
          y = center.y;
          break;
        default:
        // If more than four points are needed, you can add more cases.
      }
    }

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
    //중심점이 있는경우와 없는 경우 정답체크 로직이 다름
    setDisplayAnswer((prevDisplay) => !prevDisplay);
    const sortedLineIndexs = lines.map((line) => {
      const arrIndexLine = [line.start.index, line.end.index];
      const sortedLine = arrIndexLine.sort((a, b) => a - b);
      return sortedLine;
    });

    const correctAnswers = [
      [0, 2],
      [4, 6],
      [1, 3],
      [5, 7],
    ];
    // Check if sortedLineIndexs is a correct answer
    for (let i = 0; i < correctAnswers.length; i++) {
      if (
        sortedLineIndexs.length === 1 && //2등분은 라인 하나임
        JSON.stringify(correctAnswers[i]) ===
          JSON.stringify(sortedLineIndexs[0])
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
      <h2>주어진 그림을 2등분 하시오.</h2>
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
        <rect
          x={center.x - props.width / 4}
          y={center.y - props.height / 4}
          width={props.width / 2}
          height={props.width / 2}
          fill="#b9b9f9"
        />
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
