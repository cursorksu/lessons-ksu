import styled from '@emotion/styled';
import { CHOCO, VEREM_GOLD } from '../../constants/colors';

export const VeremChurchContent = styled('section')`
  margin: 80px 40px;
  display: grid;
  grid-template-columns: repeat(3, 31%);
  grid-gap: 40px;
  font-size: 14px;
  line-height: 1.5;
  font-family: 'Montserrat', sans-serif;
  color: #000;
  letter-spacing: 0.05em;
  font-weight: bold;
  position: relative;

  .content {
    display: block;
  }

  .balls-container {
    position: absolute;
    top: -260px;
    right: 0;
  }

  h3 {
    line-height: 1.5;
    font-family: 'Montserrat', sans-serif;
    color: #000;
    letter-spacing: 0.05em;
    text-align: center;
    margin-bottom: 20px;
    font-weight: 700;
  }
`;

export const VeremChips = styled('span')`
  color: #fff;
  display: inline-block;
  width: auto;
  max-width: 90%;
  background: ${VEREM_GOLD};
  padding: 10px 40px;
  border-radius: 30px;
  font-size: 18px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-weight: 900;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const VeremChipsSmall = styled(VeremChips)`
  padding: 3px 22px;
  font-size: 12px;
  text-transform: none;
  font-weight: 900;
`;

export const VeremLink = styled('a')`
  color: ${VEREM_GOLD};
  display: inline-block;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 0.07em;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  margin: 0;
  padding: 0;
  transition: color 0.3s ease;

  &:hover {
    color: ${CHOCO};
  }
`;