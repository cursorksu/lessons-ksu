import { ReactComponent as Puzzle1 } from '../../assets/puzzle1.svg';
import { ReactComponent as Puzzle2 } from '../../assets/puzzle2.svg';
import { ReactComponent as Puzzle3 } from '../../assets/puzzle3.svg';
import { ReactComponent as Puzzle4 } from '../../assets/puzzle4.svg';
import { LoaderStyled } from './style';
export const Loader = () => {
  return (
    <LoaderStyled className="loader">
      <div className="puzzle">
        <Puzzle1 />
        <Puzzle2 />
        <Puzzle3 />
        <Puzzle4 />
      </div>
    </LoaderStyled>
  );
};
