import { SprintCardStyled } from './SprintCardStyled';
import { ReactComponent as ShapeBg } from '../../assets/shape.svg';

export const SprintCard = ({ img, children, onClick }) => {
  return (
    <SprintCardStyled onClick={onClick}>
      <img src={img} alt="img"/>
      <div className="shape">
        <ShapeBg />
      </div>
      <div className="content">
        { children }
      </div>
    </SprintCardStyled>
  );
};