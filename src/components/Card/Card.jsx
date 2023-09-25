import { CardActions, CardContent } from '@mui/material';
import { CardStyled } from './CardStyled';

export const Card = ({
  title,
  action,
  children,
  className,
  hideTitle,
  hideAction,
}) => {
  return (
    <CardStyled className={className}>
      {!hideTitle && <h3>{title}</h3>}
      <CardContent>{children}</CardContent>
      {!hideAction && <CardActions>{action}</CardActions>}
    </CardStyled>
  );
};
