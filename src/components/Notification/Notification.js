import { TransitionablePortal } from 'semantic-ui-react';
import { useEffect } from 'react';
import { NotificationStyled } from '../NotificationStyled';
import { clsx } from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessage } from '../../store/notificationReducer';

export const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const duration = 15000;

  useEffect(() => {
    let timout = setTimeout(() => {
      dispatch(deleteMessage());
    }, duration);

    return () => clearTimeout(timout);
  }, [notification, dispatch]);

  return (
    <TransitionablePortal open={!!notification?.type}>
      <NotificationStyled
        className={clsx(notification?.type, { open: notification?.type })}
      >
        <b>{notification?.message.title}</b>
        <span>  </span>
        <span>{notification?.message.description}</span>
      </NotificationStyled>
    </TransitionablePortal>
  );
};
