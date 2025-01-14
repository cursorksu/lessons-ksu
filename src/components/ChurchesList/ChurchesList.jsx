import {UserProfileStyled} from '../UserProfile/UserProfileStyled';
import {ButtonIconStyled, ButtonStyled} from '../ButtonStyled';
import {CreateEntityForm} from '../CreateEntityForm/CreateEntityForm';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {MainLayout} from '../../pages/MainLayout';
import {churchConfig} from '../../constants/entities/churchConfig';
import {SprintCard} from '../SprintCard/SprintCard';
import {useGetAllEntities} from '../../api/entity/useGetAllEntities';
import {ChurchesListStyled} from './styles';
import {getDateLocalString} from '../../utils/getDateLocalString';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {Modal, ModalHeader} from 'semantic-ui-react';
import {ReactComponent as CloseIcon} from '../../assets/close.svg';
import {useTransactions} from '../../api/transaction/useTransactions';

const initialValues = {
    title: '',
    address: '',
    city: '',
    subtitle: '',
    about: '',
    phone: '',
    email: '',
    createdDate: new Date(),
    web: '',
    pastor: '',
    avatar: '',
    logo: '',
    pictures: [],
    groups: [],
    teachers: [],
};

export const ChurchesList = () => {
    const {user} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [isFormShown, setIsFormShown] = useState(false);
    const [defaultValues, setDefaultValues] = useState(initialValues);
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const {t} = useTranslation('tr');
    const {getAllEntities} = useGetAllEntities('church');
    const [churchList, setChurchList] = useState([]);
    const {deleteChurchWithTransaction} = useTransactions();

    useEffect(() => {
        getAllEntities().then((data) => setChurchList(data));
    }, [getAllEntities, shouldUpdate]);

    const confirmationHandler = async () => {
        setShouldUpdate((prev) => !prev);
    };

    const cardClickHandler = useCallback(
            (e, id) => {
                e.stopPropagation();
                navigate(`/church/${id}`);
            },
            [navigate]
    );

    const handleDeleteWithTransaction = async (e, churchData) => {
        e.stopPropagation();
        await deleteChurchWithTransaction(churchData);
        setShouldUpdate(prev => !prev)
    };

    return (
            <MainLayout>
                <UserProfileStyled>
                    <div className="top-container">
                        <h2 className="subtitle">Kids Spiritual Universe</h2>
                        <h1 className="title">
                            {t('mainMenu.community')}
                            {user?.uid
                                    ? (
                                            <>
                                                {user?.uid && (
                                                        <Modal
                                                                className={'ksu-modal'}
                                                                onClose={() => {
                                                                    setIsFormShown(true);
                                                                }}
                                                                onOpen={() => setIsFormShown(true)}
                                                                trigger={
                                                                    <ButtonStyled
                                                                            onClick={() => {
                                                                                setDefaultValues({
                                                                                    ...initialValues,
                                                                                    teachers: [user.uid],
                                                                                });
                                                                                setIsFormShown(true);
                                                                            }}>
                                                                        + {t('church.addChurch')}
                                                                    </ButtonStyled>
                                                                }
                                                                size={'large'}
                                                                open={isFormShown}
                                                        >
                                                            <ModalHeader className="title">
                                                                <h2>{t('church.addChurch')}</h2>
                                                                <ButtonIconStyled onClick={() => setIsFormShown(false)}>
                                                                    <CloseIcon/>
                                                                </ButtonIconStyled>
                                                            </ModalHeader>
                                                            <CreateEntityForm
                                                                    entityName="church"
                                                                    onConfirm={confirmationHandler}
                                                                    onClose={() => setIsFormShown(false)}
                                                                    fields={churchConfig}
                                                                    defaultValues={defaultValues}
                                                            />
                                                        </Modal>
                                                )}
                                            </>
                                    )
                                    : (
                                            <p className="info">
                                                Якщо ви не знайшли свою церкву у списку нижче, зареєструйтеся і
                                                додайте її самостійно. Це дозволить вам ділитися вашим креативним
                                                контентом
                                            </p>
                                    )}
                        </h1>
                    </div>
                </UserProfileStyled>
                <ChurchesListStyled>
                    {churchList?.length > 0 &&
                            churchList.map((el) => (
                                    <SprintCard
                                            key={el.id}
                                            editEnable={el.createdBy?.uid === user?.uid}
                                            onDelete={(e) => handleDeleteWithTransaction(e, el)}
                                            modalTitle={'church.deleteChurch'}
                                            modalContent={'modal.churchDelete'}
                                            onClick={(e) => cardClickHandler(e, el.id)}
                                            img={el?.avatar}
                                            titleHover={el.title}
                                            entity={el}
                                            forceUpdate={setShouldUpdate}
                                            id={el.id}>
                                        <div>
                                            <div>
                  <span className="meta">
                    {getDateLocalString(el.createdDate)}
                  </span>
                                            </div>
                                            <div>
                                                <span className="meta">{el.pastor}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <hr/>
                                            <div>
                                                <span className="meta description">{el?.about}</span>
                                            </div>
                                            <h3 className="title" title={el.title}>
                                                {el?.title}
                                            </h3>
                                        </div>
                                    </SprintCard>
                            ))}
                </ChurchesListStyled>
            </MainLayout>
    );
};
