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

const test = [
  {
    "id": "89f67733-ffdb-4ff8-ac2c-f5240db45ef7",
    "question": "Чиє Ім'я рятує від демонів? Хто спасаэ нас від наших гріхів" +
      " і дає вічне життя? Люблю тебе ❤️",
    "answer": [
      {
        char: 'A',
        "id": "bd93829b-a118-4c69-86fc-ed5c350b44e2",
        "text": "Асаїл",
        "isTrue": false
      },
      {
        char: 'B',
        "id": "a97e687e-1507-4415-946a-e5997058a50e",
        "text": "Люцифер",
        "isTrue": false
      },
      {
        char: 'C',
        "id": "a96b1b96-556d-4f8b-958d-c21dd2c244d9",
        "text": "Архангел Міїаїл",
        "isTrue": false
      },
      {
        char: 'D',
        "id": "4fdb5a67-9483-46de-a22e-259ecce0aa82",
        "text": "Іісус",
        "isTrue": true
      }
    ]
  },
  {
    "id": "42746264-5bd6-49bc-b0ae-44bdfdcad0bf",
    "question": "Хто допомагав Богу творити землю",
    "answer": [
      {
        char: 'A',
        "id": "6e1f926-2ed5-4fe7-b867-fdc3d2bb187d",
        "text": "Іісус і Дух Святий",
        "isTrue": false
      },
      {
        char: 'B',
        "id": "c908e8e-04ef-474f-92fa-7a3432bc691f",
        "text": "Ангели",
        "isTrue": false
      },
      {
        char: 'C',
        "id": "494038f-85b9-4cc7-aebc-4980c5cfe427",
        "text": "Ніхто",
        "isTrue": false
      },
      {
        char: 'D',
        "id": "781bda1-935c-4fd6-ad82-0fd6cdb4e722",
        "text": "Адам і Єва",
        "isTrue": false
      },
      {
        char: 'E',
        "id": "c6e1f926-2ed5-4fe7-b867-fdc3d2bb187d",
        "text": "Іісус і Дух Святий",
        "isTrue": true
      },
      {
        char: 'F',
        "id": "8c908e8e-04ef-474f-92fa-7a3432bc691f",
        "text": "Ангели",
        "isTrue": false
      },
      {
        char: 'G',
        "id": "d494038f-85b9-4cc7-aebc-4980c5cfe427",
        "text": "Ніхто",
        "isTrue": false
      },
      {
        char: 'H',
        "id": "9781bda1-935c-4fd6-ad82-0fd6cdb4e722",
        "text": "Адам і Єва",
        "isTrue": false
      }
    ]
  },
  {
    "id": "dd439e08-e6e0-4a5b-9288-679432e91c5",
    "question": "Хто молився у рові з левами",
    "answer": [
      {
        char: 'A',
        "id": "df003a10-20e6-4a76-8677-bdc9abb1d470",
        "text": "Ібрагім",
        "isTrue": false
      },
      {
        char: 'B',
        "id": "bf6f76f2-138b-4662-8601-ce598add1ec7",
        "text": "Даніїл",
        "isTrue": true
      },
      {
        char: 'C',
        "id": "6eb793dc-20f1-47de-a989-2bb38059becb",
        "text": "Давид",
        "isTrue": false
      },
      {
        char: 'D',
        "id": "62a9423a-6d44-44c0-9a3a-d17e5738a451",
        "text": "Соломон",
        "isTrue": false
      }
    ]
  },
  {
    "id": "221599ef-7643-4a22-a08d-0439dbef131",
    "question": "Як звали Маму Ісуса",
    "error": "error",
    "answer": [
      {
        char: 'A',
        "id": "72e8a887-8513-4dfb-9785-dee4a0f94e81",
        "text": "Мария",
        "isTrue": true
      },
      {
        char: 'B',
        "id": "03500338-f9e2-4fae-b450-56c78e9e9408",
        "text": "Мери",
        "isTrue": false
      },
      {
        char: 'C',
        "id": "0311e155-6076-437f-b73f-e5edfc56b6d6",
        "text": "Марина",
        "isTrue": false
      },
      {
        char: 'D',
        "id": "8c6e2001-6cc4-4f56-a682-86f6c4d8ba5e",
        "text": "Иванна",
        "isTrue": false
      }
    ]
  },
  {
    "id": "221599ef-7643-4a22-a08d-0439dbef1310",
    "question": "Як звали Маму Ісуса",
    "error": "error",
    "answer": [
      {
        char: 'A',
        "id": "72e8a887-8513-4dfb-9785-dee4a0f94e81",
        "text": "Мария",
        "isTrue": true
      },
      {
        char: 'B',
        "id": "03500338-f9e2-4fae-b450-56c78e9e9408",
        "text": "Мери",
        "isTrue": false
      },
      {
        char: 'C',
        "id": "0311e155-6076-437f-b73f-e5edfc56b6d6",
        "text": "Марина",
        "isTrue": false
      },
      {
        char: 'D',
        "id": "8c6e2001-6cc4-4f56-a682-86f6c4d8ba5e",
        "text": "Иванна",
        "isTrue": false
      }
    ]
  }
];
export const TestGameView = () => {
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
