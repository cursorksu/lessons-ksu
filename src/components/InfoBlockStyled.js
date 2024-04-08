import styled from '@emotion/styled';
import {
  BOX_SHADOW, CHOCO, CREAM, PRIMARY_MAIN,
} from '../constants/colors';

export const InfoItemStyled = styled.div`
  border-radius: 4px;
  border: 1px solid ${CREAM};
  margin-bottom: 10px;
  padding: 7px 32px 7px 7px;
  color: ${CREAM};
  position: relative;
  
  button {
    position: absolute;
    top: 5px;
    right: 5px;
  }
`;

export const InfoBlockStyled = styled.div`
  a {
    color: ${PRIMARY_MAIN};
    font-size: 1.2rem;
    text-decoration: underline;
    position: absolute;
    top: 5px;
    left: 6px;
    transition: color 0.3s ease-in-out;
    
    &:hover {
      color: white;
    }
  }

  background: ${CHOCO};
  color: white;
  font-weight: 300;
  font-size: 1.5rem;
  line-height: 1.5;
  padding: 20px 20px;
  border-radius: 4px;
  margin: 10px 0;
  text-align: center;
  font-family: Montserrat, sans-serif;
  box-shadow: ${BOX_SHADOW};
  position: relative;

  button {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  b {
    font-weight: 600;
  }

  //&:after,
  //&:before {
  //  content: '-------***-------';
  //  display: block;
  //  position: absolute;
  //  left: 50%;
  //  transform: translateX(-50%);
  //}
  //&:before {
  //  top: 20px;
  //}
  //&:after {
  //  bottom: 20px;
  //}
`;
