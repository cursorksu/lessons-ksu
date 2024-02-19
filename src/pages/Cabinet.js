import { MainLayout } from './MainLayout';
import { UserProfile } from '../components/UserProfile/UserProfile';
import { useSelector } from 'react-redux';

export const Cabinet = () => {
  const { user } = useSelector(state => state.auth);
  return (
    <MainLayout>
      <UserProfile user={user}/>
    </MainLayout>
  );
};