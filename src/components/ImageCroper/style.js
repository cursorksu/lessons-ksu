import styled from '@emotion/styled';
import { CHOCO, VEREM_GOLD, VEREM_GOLD_BG } from '../../constants/colors';

export const CroppedImageStyled = styled('div')`
  position: relative;

  .img-preview {
     width: 100px;
     height: 100px;
     margin-right: 20px;
     border: 1px solid ${VEREM_GOLD};
     margin-bottom: 10px;
     border-radius: 30px;
     display: flex;
     justify-content: center;
     align-items: center;
     background: #fff;
     
     svg  {
        width: 60px;
        height: 60px;
     }
   }

  .img-holder {
    width: 100px;
    height: 100px;
    object-fit: cover;
    display: block;
    margin-right: 20px;
    border: 1px solid ${VEREM_GOLD};
    margin-bottom: 10px;
    border-radius: 4px;
  }
  
  input[type="file"] {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
  }
`;