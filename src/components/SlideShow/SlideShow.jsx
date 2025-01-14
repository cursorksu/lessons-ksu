import React, { useCallback, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, Keyboard } from 'swiper/modules';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as ArrowLeft } from '../../assets/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../assets/arrow-right.svg';
import { ReactComponent as ScreenIcon } from '../../assets/screen.svg';
import { ReactComponent as FullScreenIcon } from '../../assets/full-screen.svg';
import { SwiperSlider } from './SwiperSlider';
import 'swiper/css';
import 'swiper/css/pagination';
import { Popup } from 'semantic-ui-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { ButtonIconMiniStyled, ButtonStyled } from '../ButtonStyled';
import { MultiImageUploader } from '../ImageCroper/MultiImageUploader';
import { BigModal } from '../Modal/BigModal';
import {StudentProfileStyled} from "./style";

export const SlideShow = ({
                              isAuth,
                              slideList,
                              blur,
                              autoplay = false,
                              navigation = true,
                              entityName = 'error',
                              entity = null,
                              storageFolderName,
                              forceUpdate
                          }) => {
    const [ fullScreen, setFullScreen ] = useState(false);
    const [ isFormOpen, setIsFormOpen ] = useState(false);
    const { t } = useTranslation('tr');


    return (
        <StudentProfileStyled>
            <SwiperSlider
                className={clsx('print-hide', {
                    'full-screen': fullScreen,
                })}
                slidesPerView={1}
                keyboard={{
                    enabled: true,
                }}
                loop
                navigation={navigation}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                effect={'cube'}
                grabCursor={true}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                modules={autoplay
                         ? [ Autoplay, Keyboard, Pagination, Navigation ]
                         : [ Keyboard, Pagination, Navigation ]}
            >
                {isAuth && (
                    <BigModal
                        isOpen={isFormOpen}
                        setIsOpen={setIsFormOpen}
                        modalTitle={t('church.selectImagesForGallery')}
                        onCancel={() => setIsFormOpen(false)}
                        icon={<EditIcon/>}
                    >
                        <MultiImageUploader
                            closeForm={() => setIsFormOpen(false)}
                            forceUpdate={forceUpdate}
                            entityName={entityName}
                            entity={entity}
                        />
                    </BigModal>
                )}
                <Popup
                    trigger={
                        <ButtonIconMiniStyled
                            onClick={() => setFullScreen((prev) => !prev)}
                            className="print-hide full-screen-button">
                            {fullScreen ? <ScreenIcon/> : <FullScreenIcon/>}
                        </ButtonIconMiniStyled>
                    }
                    content={fullScreen ? t('fullScreenOff') : t('fullScreenOn')}
                />

                {slideList?.map((el) => (
                    <SwiperSlide key={el?.id}>
                        {blur ? (
                            <div
                                className="img"
                                style={{
                                    backgroundImage:
                                        `url("${el.value}")`,
                                }}/>
                        ) : (
                             <>
                                 <img src={el.value} alt={el.description}/>
                                 {el.description && (
                                     <div className="description">
                                         <p>{el.description}</p>
                                     </div>
                                 )}
                             </>
                         )}
                    </SwiperSlide>
                ))}

                {navigation && (
                    <>
                        <div className="button-next">
                            <ArrowLeft/>
                        </div>

                        <div className="button-prev">
                            <ArrowRight/>
                        </div>
                    </>
                )}
            </SwiperSlider>
        </StudentProfileStyled>
    );
};
