import { useEffect, useRef } from 'react';
import useAnimationFrame from '@phntms/use-animation-frame';
import './App.css';

const text = "blurrrrrr";
const amount = {
  rows: 13,
  cols: 8,
}
const repeatedText: string[][] = [];

for (let i = 0; i < amount.rows; i++) {
  const row = [];
  for (let j = 0; j < amount.cols; j++) {
    row.push(text);
  }
  repeatedText.push(row);
}

type Position = {
  x: number;
  y: number;
}

const getDistance = (mousePos: Position, elemPos: Position) => {
  const xDiff = mousePos.x - elemPos.x;
  const yDiff = mousePos.y - elemPos.y;
  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
}

const clamp = (val: number, min: number, max: number) => {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

function App() {
  const mousePosRef = useRef<Position>({
    x: 99999,
    y: 99999
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mousePosRef.current) return;
      mousePosRef.current.x = e.clientX;
      mousePosRef.current.y = e.clientY;
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    }
  })

  useAnimationFrame(() => {
    updateTextElements();
  })

  const updateTextElements = () => {
    if (!mousePosRef.current) return;
    const textElements = document.getElementsByClassName('text');
    for (const elem of textElements) {
      const boundingRect = elem.getBoundingClientRect();
      const elemPos = {
        x: boundingRect.x + elem.clientWidth / 2,
        y: boundingRect.y + elem.clientHeight / 2
      }
      const dist = getDistance(mousePosRef.current, elemPos);
      const clampedDist = clamp(dist, 0, 600);

      (elem as HTMLElement).style.filter = `blur(${clampedDist / 65}px)`;
    }
  }

  return (
    <main>
      <div className='repeated-text'>
        {repeatedText.map((row, i) => (
          <div 
            className="row"
            key={i}
          >
            {row.map((text, j) => (
              <span 
                className='text' 
                style={{ translate: `-${i * 7.5}%`}}
                key={j}
              >
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}

export default App;
