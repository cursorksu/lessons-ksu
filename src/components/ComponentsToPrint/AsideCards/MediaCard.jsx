import {KsuCard} from '../../KsuCard';
import {TitleSmall} from '../../TitleStyled';
import {ReactComponent as PalletIcon} from '../../../assets/pallete.svg';
import {ReactComponent as TopicIcon} from '../../../assets/topic.svg';
import {ReactComponent as GameIcon} from '../../../assets/game.svg';
import {ReactComponent as FoodIcon} from '../../../assets/food.svg';
import {ReactComponent as MemoryIcon} from '../../../assets/memory.svg';
import {ReactComponent as BookmarkIcon} from '../../../assets/bookmark.svg';
import {ReactComponent as PresentationIcon} from '../../../assets/presentation.svg';
import {ReactComponent as VideoIcon} from '../../../assets/video.svg';
import {ReactComponent as PrintIcon} from '../../../assets/print.svg';
import {MediaButton} from './MediaButton';
import {MediaButtonWrapperStyled} from './styles';
import clsx from 'clsx';
import {useSelector} from 'react-redux';

export const MediaCard = ({setActiveTab, activeTab, lesson}) => {
    const {user} = useSelector((state) => state.auth);

    const btnShouldDisplay = (condition) => {
        if (user?.uid && lesson?.createdBy?.uid) return true;
        if (!!condition) return !!condition;
    };
    return (
            <KsuCard className={'admin-panel print-hide'}>
                <TitleSmall>План урока:</TitleSmall>
                <MediaButtonWrapperStyled>
                    {btnShouldDisplay(lesson?.topic) && (
                            <MediaButton
                                    className={clsx({active: activeTab === 0, exist: lesson?.topic})}
                                    title={'lessonTabs.topic'}
                                    icon={<TopicIcon/>}
                                    onClick={() => setActiveTab(0)}
                            />
                    )}
                    {btnShouldDisplay(lesson?.presentation?.length > 0) && (
                            <MediaButton
                                    className={clsx({active: activeTab === 1, exist: lesson?.presentation?.length})}
                                    title={'lessonTabs.presentation'}
                                    icon={<PresentationIcon/>}
                                    onClick={() => setActiveTab(1)}
                            />
                    )}
                    {btnShouldDisplay(lesson?.video) && (
                            <MediaButton
                                    className={clsx({active: activeTab === 2, exist: lesson?.video?.videoUrl})}
                                    title={'lessonTabs.video'}
                                    icon={<VideoIcon/>}
                                    onClick={() => setActiveTab(2)}
                            />
                    )}
                    {btnShouldDisplay(lesson?.subject) && (
                            <MediaButton
                                    className={clsx({active: activeTab === 3, exist: lesson?.subject})}
                                    title={'lessonTabs.subject'}
                                    icon={<BookmarkIcon/>}
                                    onClick={() => setActiveTab(3)}
                            />
                    )}
                    {btnShouldDisplay(lesson?.creative?.length > 0) && (
                            <MediaButton
                                    className={clsx({active: activeTab === 4, exist: lesson?.creative?.length})}
                                    title={'lessonTabs.creative'}
                                    icon={<PalletIcon/>}
                                    onClick={() => setActiveTab(4)}
                            />
                    )}
                    {btnShouldDisplay(lesson?.game?.length > 0) && (
                            <MediaButton
                                    className={clsx({active: activeTab === 5, exist: lesson?.game?.length})}
                                    title={'lessonTabs.game'}
                                    icon={<GameIcon/>}
                                    onClick={() => setActiveTab(5)}
                            />
                    )}
                    {btnShouldDisplay(lesson?.memory?.length > 0) && (
                            <MediaButton
                                    className={clsx({active: activeTab === 6, exist: lesson?.memory?.memory})}
                                    title={'lessonTabs.memory'}
                                    icon={<MemoryIcon/>}
                                    onClick={() => setActiveTab(6)}
                            />
                    )}
                    {btnShouldDisplay(lesson?.food?.length > 0) && (
                            <MediaButton
                                    className={clsx({active: activeTab === 7, exist: lesson?.food?.length})}
                                    title={'lessonTabs.food'}
                                    icon={<FoodIcon/>}
                                    onClick={() => setActiveTab(7)}
                            />
                    )}

                    <MediaButton
                            className={clsx('exist', {active: activeTab === 8})}
                            title={'lessonTabs.print'}
                            icon={<PrintIcon/>}
                            onClick={() => setActiveTab(8)}
                    />
                </MediaButtonWrapperStyled>
            </KsuCard>
    );
};
