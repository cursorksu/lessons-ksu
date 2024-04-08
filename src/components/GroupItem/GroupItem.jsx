import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useGetEntity } from '../../api/entity/useGetEntity';
import { MainLayout } from '../../pages/MainLayout';
import { UserProfileStyled } from '../UserProfile/UserProfileStyled';
import { ButtonIconStyled } from '../ButtonStyled';
import { CreateEntityForm } from '../CreateEntityForm/CreateEntityForm';
import { useSelector } from 'react-redux';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';

export const GroupItem = () => {
  const { groupId } = useParams();
  const { user } = useSelector(state => state.auth);
  const { getEntityById } = useGetEntity('group', groupId);
  const [isFormShown, setIsFormShown] = useState(false);
  const [group, setGroup] = useState({});

  useEffect(() => {
    getEntityById().then(data => setGroup(data));
  }, [groupId, getEntityById]);

  return (
    <MainLayout>
      <UserProfileStyled>
        <div className="top-container">
          <div className='d-flex'>
            <h1 className="title">{group?.title}</h1>
          </div>
          <div>
            {group?.createdBy?.uid === user?.uid && (
              <ButtonIconStyled onClick={() => setIsFormShown(true)}>
                <EditIcon />
              </ButtonIconStyled>
            )}
          </div>
        </div>

        {isFormShown && (
          <CreateEntityForm
            entityName="church"
            onConfirm={() => {}}
            onClose={() => setIsFormShown(false)}
            fields={[]}
            defaultValues={{}}
          />
        )}
      </UserProfileStyled>
      <div>{JSON.stringify(group)}</div>
    </MainLayout>
  );
};
