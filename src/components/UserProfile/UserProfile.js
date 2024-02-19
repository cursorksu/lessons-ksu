import { UserProfileStyled } from './UserProfileStyled';
import { Image } from 'semantic-ui-react';
import { useCreateCollections } from '../../api/collections';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const UserProfile = ({ user }) => {
  const navigate = useNavigate();
  const { createCollection } = useCreateCollections();

  useEffect(() => {
    if (!user?.uid) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <UserProfileStyled>
      <Image src={user?.avatar} size='tiny' circular />
      <button onClick={() => createCollection({
        author: user?.uid,
        name: 'firstCollection'
      })}>create Collection</button>
      <div>
        <h1 className="title">{user?.firstName} {user?.lastName}</h1>
        <div className="meta">{user?.email}</div>
      </div>
    </UserProfileStyled>
  );
};