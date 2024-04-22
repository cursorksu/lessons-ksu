import styled from '@emotion/styled';
import {
  CHOCO, ERROR_MAIN, PRIMARY_MAIN, SUCCESS, YELLOW_MAIN
} from '../../constants/colors';
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
      background: rgba(163, 147, 103, 0.5) linear-gradient(transparent, rgba(255, 255, 255, .8));
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
  margin: 2px;
  font-size: 1.2rem;
  padding: 10px 22px;
  border-radius: 30px;
  font-family: Montserrat, sans-serif;
  color: white;
  font-weight: 700;
  display: inline-block;
  text-transform: uppercase;
  
  &.draft {
    background: ${PRIMARY_MAIN};
  }

  &.active {
    background: ${ERROR_MAIN};
  }

  &.public {
    background: ${SUCCESS};
  }

  &.waiting {
    background: ${YELLOW_MAIN};
  }
`;
