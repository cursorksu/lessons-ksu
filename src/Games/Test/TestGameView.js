import { MainLayout } from '../../pages/MainLayout';
import { TestGameViewStyled } from './TestGameViewStyled';
import { HighlightButton } from '../../components/HighlightButton';
import { SwiperSlider } from '../../components/SlideShow/SwiperSlider';
import clsx from 'clsx';
import { Keyboard, Navigation, Pagination } from 'swiper/modules';
import { ReactComponent as ArrowLeft } from '../../assets/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../assets/arrow-right.svg';
import { SwiperSlide } from 'swiper/react';
import React, { useEffect, useRef, useState } from 'react';

export const TestGameView = () => {
  const [test, setTest] = useState([]);

  useEffect(() => {
    const list = localStorage.getItem('test');
    let parsedList;
    if (list) {
      parsedList = JSON.parse(list);
    }

    parsedList && setTest(parsedList);
  }, []);
  const [startSound, setStartSound] = useState(false);
  const [score, setScore] = useState(0);
  const [correctSound, setCorrectSound] = useState(false);
  const [errorSound, setErrorSound] = useState(false);
  const [timerSound, setTimerSound] = useState(false);
  const [timer, setTimer] = useState(45);
  const [isRespond, setIsRespond] = useState(false);
  const [selected, setSelected] = useState(null);
  const [hint, setHint] = useState({
    fiftyFifty: false,
    friendHelp: false,
    spectaculars: false,
  });
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const musicRef = useRef(null);

  // Effect to handle timer countdown
  useEffect(() => {
    if (timerSound) {
      intervalRef.current = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [timerSound]);

  // Effect to handle timer sound timeout
  useEffect(() => {
    if (timerSound) {
      timeoutRef.current = setTimeout(() => {
        setTimerSound(false);
      }, 45000);
    }

    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(musicRef.current);
    };
  }, [timerSound]);



  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '" onClick="() =>' +
        ' setTimerSound(true)">' + (index + 1) + '</span>';
    },
  };

  const handleStop = async () => {
    await setTimerSound(false);
    await setTimer(45);
    await setStartSound(false);
    await setCorrectSound(false);
    await setErrorSound(false);
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
  };
  const handleSlideChange = (slide) => {
    handleStop().then(() => {
      if (slide.activeIndex === 1) {
        setStartSound(true);
        setScore(0);
      } else {
        setTimerSound(true);
      }
      setIsRespond(false);
    });
  };

  const handleSelect = (id, isFact) => {
    handleStop().then(() => {
      setIsRespond(true);
      setSelected(id);

      if (isFact) {
        setCorrectSound(true);
        setScore(prev => prev + 10);
      } else {
        setErrorSound(true);
      }

      musicRef.current = setTimeout(() => {
        setCorrectSound(false);
        setErrorSound(false);
      }, 6000);
    });
  };

  return (
    <MainLayout>
      <TestGameViewStyled>
        <div className='navigation'>
          <div className='score'>Баллів: {score}</div>
          <div className='hints'>
            <div
              className={clsx({
                used: hint.fiftyFifty,
              })}
              onClick={() => setHint(prev => ({...prev, fiftyFifty: true}))}
            />
            <div
              className={clsx({
                used: hint.friendHelp,
              })}
              onClick={() => setHint(prev => ({...prev, friendHelp: true}))}
            />
            <div
              className={clsx({
                used: hint.spectaculars,
              })}
              onClick={() => setHint(prev => ({...prev, spectaculars: true}))}
            />
          </div>
        </div>
        <SwiperSlider
          slidesPerView={1}
          keyboard={{
            enabled: true,
          }}
          loop
          navigation
          centeredSlides={true}
          grabCursor={true}
          onSlideChange={handleSlideChange}
          pagination={pagination}
          modules={[Keyboard, Pagination, Navigation]}
        >
          <SwiperSlide>
            <div className="ksu-slide">
              <div className="start-slide">
                <h1>START</h1>
                <img src='https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fpngegg.png?alt=media&token=139b4be5-a7b8-461b-a558-5f4c4416292d' alt='millioner' />
              </div>
            </div>
          </SwiperSlide>
          {test?.map((el) => (
            <SwiperSlide key={el?.id}>
              <div className="ksu-slide">
                <HighlightButton content={timer} onClick={handleStop} />
                <div className="question">
                  <div className="answer">{el.question}</div>
                </div>
                <ul className="answer-group">
                  {
                    el.answer.map(item => (
                      <li
                        key={item.id}
                        onClick={() => handleSelect(item.id, item.isTrue)}
                        role="button"
                        className={clsx({
                          fact: isRespond && item.isTrue,
                          selected: isRespond && item.id === selected,
                        })
                        }>
                        <HighlightButton
                          content={item.char}
                        />
                        <div className='answer'>{item.text}</div>
                      </li>
                    ))}
                </ul>
              </div>
            </SwiperSlide>))}

          <div className='button-next'>
            <ArrowLeft />
          </div>

          <div className='button-prev'>
            <ArrowRight />
          </div>
        </SwiperSlider>
        {startSound && (
          <audio autoPlay={true}>
            <source src="https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/sounds%2FstartSound.mp3?alt=media&token=97c06d46-01c3-4d46-a515-68513c57cc40" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
        {correctSound && (
          <audio autoPlay={true}>
            <source src="https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/sounds%2FcorrectSound.mp3?alt=media&token=dd985855-cdb5-40cd-9f1b-18543f5072e2" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
        {errorSound && (
          <audio autoPlay={true}>
            <source src="https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/sounds%2FerrorSound.mp3?alt=media&token=31e41692-7cdb-4b12-a489-60ea471f0828" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
        {timerSound && (
          <audio autoPlay={true}>
            <source src="https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/sounds%2FtimerSound.mp3?alt=media&token=54973a9f-02c7-4603-9bc7-3e2ab9916d11" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </TestGameViewStyled>
    </MainLayout>
  );
};
