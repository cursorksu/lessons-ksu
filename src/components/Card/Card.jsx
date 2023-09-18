import { CardActions, CardContent } from '@mui/material';
import { CardStyled } from './CardStyled';

export const Card = ({ title, action, children, className }) => {
  return (
    <CardStyled className={className}>
      <h3>{title}</h3>
      <CardContent>{children}</CardContent>
      <CardActions>{action}</CardActions>
    </CardStyled>
  );
};
