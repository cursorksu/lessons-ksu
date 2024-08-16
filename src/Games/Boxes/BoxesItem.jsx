import React, { useEffect, useState } from 'react';

export const BoxesItem = ({ element, shouldReload, soundOn }) => {
  const [backgroundPosition, setBackgroundPosition] = useState(0);

  useEffect(() => {
    setBackgroundPosition(0);
  }, [shouldReload]);

  const handleBoxClick = () => {
    let count = 0;
    const maxExecutions = 3;
    soundOn();
    const interval = setInterval(() => {
      setBackgroundPosition(prev => prev - 270);
      count++;

      if (count >= maxExecutions) {
        clearInterval(interval);
      }
    }, 160);
  };

  return (
    <li onClick={handleBoxClick} role={'button'} disabled={backgroundPosition !== 0}>
      <div
        className={'question-item'}
        style={{ backgroundPosition: `${backgroundPosition}px center` }}
      >
        <div
          className={`shadow-point ${backgroundPosition === -810 && 'show'}`}
        >
          {element.question}
        </div>
      </div>

    </li>
  );
};
