import styled from '@emotion/styled';

export const LessonCardStyled = styled.div`
  font-family: 'Coco Gothic Alternate', sans-serif;
  font-size: 16px;
  font-weight: 200;
  height: 500px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  background: url("https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202023-09-28%20%D0%B2%2017.37.35.png?alt=media&token=aa9606d1-7f3b-429f-b54b-1bea7584c295");
  background-size: cover;
  border-radius: 16px;
  overflow: visible;
  padding: 70px 30px 30px;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid white;
    border-radius: 16px;
    transform: scale(1.01) rotate(-2deg);
    z-index: 1;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.3;
    background: url("https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fbranches.png?alt=media&token=9d83a39e-5f17-4412-a159-789ec1e55f05") no-repeat;
    background-size: contain;
    border-radius: 16px;
    z-index: 0;
  }
  
  .MuiButton-root {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1;
  }

  .img-wrapper {
    overflow: visible;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px solid white;
      border-radius: 16px;
      transform: scale(1.01) rotate(-4deg);
      z-index: 1;
    }

    .overflow {
      height: 240px;
      border-radius: 16px;
      transform: rotate(2deg);
      overflow: hidden;

      img {
        height: 240px;
        width: 100%;
        border-radius: 16px;
        object-fit: cover;
        object-position: center;
        transform: scale(1);
        transition: transform 0.4s ease-in-out;
      }
    }
  }
  .top-block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 12px;
  }
  .title {
    max-width: 100%;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }

  &:hover {
    img {
      transform: scale(1.3) !important;
    }
  }
`;
