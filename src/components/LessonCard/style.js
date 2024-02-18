import styled from '@emotion/styled';
import { CREAM, ERROR_MAIN } from '../../constants/colors';

export const LessonCardStyled = styled.div`
  font-family: 'Coco Gothic Alternate', sans-serif;
  font-size: 16px;
  font-weight: 200;
  height: 500px;
  box-sizing: border-box;
  cursor: pointer;
  background: ${CREAM};
  position: relative;
  background: url("https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202023-09-28%20%D0%B2%2017.37.35.png?alt=media&token=aa9606d1-7f3b-429f-b54b-1bea7584c295");
  background-size: cover;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .card-img-wrapper {
    width: 100%;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${CREAM};
    background: rgba(0,0,0,0.3);

      img {
        transform: none;
        height: 180px;
        width: 100%;
        object-fit: cover;
        position: static;
        max-width: initial;
        max-height: initial;
      }
    
    svg {
      opacity: 0.3;
      width: 60px;
      height: 60px;
    }
  }
  .content {
    padding: 15px;
  }
  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    
    p {
      margin: 0;
    }
  }

  .title.card-title {
    color: ${CREAM};
    font-weight: 400;
    font-size: 30px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    margin-bottom: 10px !important;
    padding-bottom: 10px;
  }
  
  .description {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .quote {
    font-style: italic;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
