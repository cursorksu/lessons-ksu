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

export const MediaCard = ({ setActiveTab, activeTab }) => {
    return (
            <KsuCard className={'admin-panel print-hide'}>
                <TitleSmall>План урока:</TitleSmall>
                <MediaButtonWrapperStyled>
                    <MediaButton
                            className={clsx({active: activeTab === 0})}
                            title={'lessonTabs.topic'}
                            icon={<TopicIcon/>}
                            onClick={() => setActiveTab(0)}
                    />
                    <MediaButton
                            className={clsx({active: activeTab === 1})}
                            title={'lessonTabs.presentation'}
                            icon={<PresentationIcon/>}
                            onClick={() => setActiveTab(1)}
                    />
                    <MediaButton
                            className={clsx({active: activeTab === 2})}
                            title={'lessonTabs.video'}
                            icon={<VideoIcon/>}
                            onClick={() => setActiveTab(2)}
                    />
                    <MediaButton
                            className={clsx({active: activeTab === 3})}
                            title={'lessonTabs.subject'}
                            icon={<BookmarkIcon/>}
                            onClick={() => setActiveTab(3)}
                    />
                    <MediaButton
                            className={clsx({active: activeTab === 4})}
                            title={'lessonTabs.creative'}
                            icon={<PalletIcon/>}
                            onClick={() => setActiveTab(4)}
                    />
                    <MediaButton
                            className={clsx({active: activeTab === 5})}
                            title={'lessonTabs.game'}
                            icon={<GameIcon/>}
                            onClick={() => setActiveTab(5)}
                    />
                    <MediaButton
                            className={clsx({active: activeTab === 6})}
                            title={'lessonTabs.memory'}
                            icon={<MemoryIcon/>}
                            onClick={() => setActiveTab(6)}
                    />
                    <MediaButton
                            className={clsx({active: activeTab === 7})}
                            title={'lessonTabs.food'}
                            icon={<FoodIcon/>}
                            onClick={() => setActiveTab(7)}
                    />
                    <MediaButton
                            className={clsx({active: activeTab === 8})}
                            title={'lessonTabs.print'}
                            icon={<PrintIcon/>}
                            onClick={() => setActiveTab(8)}
                    />
                </MediaButtonWrapperStyled>
            </KsuCard>
    );
};
