import styled from '@emotion/styled';
import { CREAM } from '../../constants/colors';

export const LessonCardStyled = styled.div`
  color: white !important;
  font-family: 'Comfortaa', sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  height: 600px;
  box-sizing: border-box;
  cursor: pointer;

  position: relative;
  background-size: cover;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .card-img-wrapper {
    width: 100%;
    min-height: 240px;
    object-fit: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${CREAM};
    background: rgba(0, 0, 0, 0.3);

    img {
      transform: none;
      height: 240px;
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
    display: block;
  }
  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background: dimgrey;

    p {
      color: #fff;
      margin: 0;
    }
  }

  .title.card-title {
    color: ${CREAM};
    font-weight: 400;
    font-size: 30px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    padding-bottom: 10px;
  }

  .description {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .quote {
    font-style: italic;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
