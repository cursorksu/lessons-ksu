import {KsuCard} from '../../KsuCard';
import {ButtonIconMiniStyled} from '../../ButtonStyled';
import {Controller} from 'react-hook-form';
import {FormField} from 'semantic-ui-react';
import {InputStyled} from '../../InputStyled';
import {ReactComponent as EditIcon} from '../../../assets/edit.svg';
import {ReactComponent as SaveIcon} from '../../../assets/save.svg';
import React from 'react';
import {useSelector} from 'react-redux';

export const BibleText = ({lesson, onEdit}) => {
    const [isEdit, setIsEdit] = React.useState(false);
    const {user} = useSelector((state) => state.auth);
    return (
            <KsuCard
                    className={'bible'}
                    title={lesson?.bibleQuote}
                    action={user?.uid && lesson?.createdBy?.uid === user?.uid && (<>
                        {!isEdit ? (
                                <ButtonIconMiniStyled onClick={() => setIsEdit(true)}>
                                    <EditIcon/>
                                </ButtonIconMiniStyled>
                        ) : (
                                <ButtonIconMiniStyled onClick={() => onEdit('bible')}>
                                    <SaveIcon/>
                                </ButtonIconMiniStyled>
                        )}
                    </>)}>
                <div>
                    {isEdit ? (<div className="print-hide">
                        <Controller
                                name="bibleText"
                                control={control}
                                render={({field}) => (<FormField>
                                    <InputStyled
                                            placeholder={'Біблійний текст'}
                                            onChange={({target}) => setValue('bibleText', target.value)}
                                            {...field}
                                    />
                                </FormField>)}
                        />
                        <Controller
                                name="bibleQuote"
                                control={control}
                                render={({field}) => (<FormField>
                                    <InputStyled
                                            placeholder={'Де написаний'}
                                            onChange={({target}) => setValue('bibleQuote', target.value)}
                                            {...field}
                                    />
                                </FormField>)}
                        />
                    </div>) : <p>{lesson?.bibleText}</p>}
                </div>
            </KsuCard>
    );
};