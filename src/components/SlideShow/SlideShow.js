import React, { useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Keyboard } from 'swiper/modules';
import { ReactComponent as ArrowLeft } from '../../assets/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../assets/arrow-right.svg';
import { ReactComponent as ScreenIcon } from '../../assets/screen.svg';
import { ReactComponent as FullScreenIcon } from '../../assets/full-screen.svg';
import { SwiperSlider } from './SwiperSlider';
import 'swiper/css';
import 'swiper/css/pagination';
import { ButtonIconStyled } from '../ButtonStyled';
import { Popup } from 'semantic-ui-react';
import clsx from 'clsx';

export const SlideShow = ({ slideList }) => {
  const [fullScreen, setFullScreen] = useState(false);

  return (<>
    <SwiperSlider
      className={clsx('print-hide', {
        'full-screen': fullScreen,
      })}
      slidesPerView={1}
      keyboard={{
        enabled: true,
      }}
      loop
      navigation
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      effect={'cube'}
      grabCursor={true}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      modules={[Keyboard, Pagination, Navigation]}
    >
      <Popup
        trigger={(
          <ButtonIconStyled
            onClick={() => setFullScreen((prev) => !prev)}
            className='print-hide full-screen-button'
          >
            {fullScreen
              ? <ScreenIcon />
              : <FullScreenIcon />}
          </ButtonIconStyled>
        )}
        content={`${fullScreen ? 'Вимкнути' : 'Встановити'} повноекранний режим`}
      />

      {slideList?.map((el) => (<SwiperSlide key={el?.id}>
        <img src={el.value} alt={el.description} />
        <div className='description'>
          <p>{el.description}</p>
        </div>
      </SwiperSlide>))}

      <div className='button-next'>
        <ArrowLeft />
      </div>

      <div className='button-prev'>
        <ArrowRight />
      </div>
    </SwiperSlider>
  </>);
};
