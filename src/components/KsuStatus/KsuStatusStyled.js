import styled from '@emotion/styled';
import {
  CHOCO,
  ERROR_MAIN,
  PRIMARY_MAIN,
  SUCCESS,
  YELLOW_MAIN,
} from '../../constants/colors';
export const EntityStatusMenuStyled = styled.ul`
  padding: 0 10px 10px;
  display: flex;
  text-align: center;
  margin: 0;
`;
export const StatusListStyled = styled.ul`
  padding: 0;
  margin: 0;

  li {
    margin: 0;
    padding: 5px;
    list-style-type: none;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      cursor: pointer;
      background: rgba(163, 147, 103, 0.5)
        linear-gradient(transparent, rgba(255, 255, 255, 0.8));
    }
  }

  .title {
    font-family: Montserrat, sans-serif;
    color: ${CHOCO};
    font-size: 1.4rem;
    text-align: left;
    font-weight: 700;
  }
  .description {
    font-family: Montserrat, sans-serif;
    color: ${CHOCO};
    font-size: 1rem;
    text-align: left;
    font-weight: 300;
  }
`;

export const KsuStatusStyled = styled.div`
  margin: 0 5px;
  font-size: 14px;
  padding: 12px 40px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  font-family: Montserrat, sans-serif;
  color: white;
  font-weight: 400;
  display: inline-block;
  text-transform: uppercase;
  background: ${CHOCO};

  &.draft {
    background: ${PRIMARY_MAIN};
  }

  &.active {
    background: ${ERROR_MAIN};
  }

  &.published {
    background: ${SUCCESS};
  }

  &.waiting {
    background: ${YELLOW_MAIN};
  }
`;
