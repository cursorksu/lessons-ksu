import styled from '@emotion/styled';
import { CHOCO, VEREM_GOLD, VEREM_GOLD_BG } from '../../constants/colors';

export const CroppedImageStyled = styled('div')`
  .img-holder {
    width: 100px;
    height: 100px;
    object-fit: cover;
    display: block;
    margin-right: 20px;
    border: 1px dashed ${VEREM_GOLD};
    margin-bottom: 10px;
    border-radius: 4px;
  }
`;