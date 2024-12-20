import styled from '@emotion/styled';
import { CHOCO, VEREM_GOLD, VEREM_GOLD_BG } from '../../constants/colors';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const DropzoneStyled = styled.div`
    width: 100%;
    height: 200px;
    border: 2px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    label {
        cursor: pointer;
        color: #888;
    }
`;

export const Content = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 20px;
    
    .button-wrapper {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
`;

export const ImageArea = styled.div`
    flex: 1;
    position: relative;
    height: 316px;
    border-radius: 4px;
    overflow: hidden;
    
    .hide {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      opacity: 0;
    }
    
    .image-holder {
      width: 316px;
      height: 316px;
      overflow: hidden;
      
      img {
          width: 1000%;
          height: 316px;
          object-fit: cover;
      }
    }
`;

export const Metadata = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;    
    gap: 10px;
    font-family: Comfortaa, sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: ${CHOCO};
    
    .hide {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      opacity: 0;
    }
`;

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