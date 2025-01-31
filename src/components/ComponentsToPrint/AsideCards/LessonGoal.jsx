import {ButtonIconMiniStyled} from '../../ButtonStyled';
import {Controller} from 'react-hook-form';
import {FormField} from 'semantic-ui-react';
import {InputStyled} from '../../InputStyled';
import {HTMLRenderer} from '../../HTMLRender/HTMLRender';
import {KsuCard} from '../../KsuCard';
import React, {useState} from 'react';
import {ReactComponent as EditIcon} from '../../../assets/edit.svg';
import {ReactComponent as SaveIcon} from '../../../assets/save.svg';
import {useSelector} from 'react-redux';

export const LessonGoal = ({onEdit, lesson}) => {
    const [isGoalEdit, setIsGoalEdit] = useState(false);
    const {user} = useSelector((state) => state.auth);
    return (
            <KsuCard
                    title={'Мета уроку'}
                    action={user?.uid && lesson?.createdBy?.uid === user?.uid && (<>
                        {!isGoalEdit ? (<ButtonIconMiniStyled onClick={() => setIsGoalEdit(true)}>
                            <EditIcon/>
                        </ButtonIconMiniStyled>) : (<ButtonIconMiniStyled
                                onClick={() => onEdit('goal')}>
                            <SaveIcon/>
                        </ButtonIconMiniStyled>)}
                    </>)}>
                <div>
                    {isGoalEdit ? (<Controller
                            name="goal"
                            control={control}
                            render={({field}) => (<FormField>
                                <InputStyled
                                        name="goal"
                                        placeholder={'Почніть вводити щось...'}
                                        onChange={(data) => setValue('goal', data)}
                                        {...field}
                                />
                            </FormField>)}
                    />) : (<HTMLRenderer htmlContent={lesson?.goal}/>)}
                </div>
            </KsuCard>
    );
};