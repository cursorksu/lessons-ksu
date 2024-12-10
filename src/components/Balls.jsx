import React, { useEffect, useRef } from 'react';

export const Balls = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const ballCount = 10;
    const maxSize = 80;
    const minSize = 8;
    const containerWidth = 300;
    const containerHeight = 300;

    function createRandomBall(id) {
      const ball = document.createElement('div');
      ball.classList.add('ball');
      ball.id = `ball${id}`;
      const size = Math.random() * (maxSize - minSize) + minSize;
      const scale = size / minSize;
      const duration = (Math.random() * 2 + 2).toFixed(2) + 's';
      const left = Math.random() * (containerWidth - size);
      const top = Math.random() * (containerHeight - size);

      ball.style.width = ball.style.height = `${size}px`;
      ball.style.left = `${left}px`;
      ball.style.top = `${top}px`;
      ball.style.setProperty('--animation-duration', duration);
      ball.style.setProperty('--scale', scale);

      return ball;
    }

    for (let i = 1; i <= ballCount; i++) {
      const ball = createRandomBall(i);
      container.appendChild(ball);
    }

    return () => {
      container.innerHTML = ''; // Очистка при размонтировании
    };
  }, []);

  return <div ref={containerRef} className="balls-container"></div>;
};
