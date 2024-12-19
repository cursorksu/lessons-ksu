import styled from '@emotion/styled';
import {
  DARK_GRAY,
  BOX_SHADOW,
  BOX_SHADOW_HOVER,
} from '../../constants/colors';

export const LessonListStyled = styled('div')`
  & > .grid {
    margin: 0;
    padding: 20px;
  }

  .lessons-grid {
    display: grid;
    grid-template-columns: 23% 23% 23% 23%;
    grid-gap: 3%;
    padding: 3%;
  }

  .cards-grid {
    .content {
      padding-bottom: 0;
    }

    .description {
      text-align: center;
      img {
        display: none;
      }
    }
    .description,
    .title.card-title,
    .quote {
      color: ${DARK_GRAY};
    }
  }

  .ui.card {
    border: none !important;
    box-shadow: ${BOX_SHADOW};
    transition: box-shadow 0.3s ease-in-out;
    &:hover {
      box-shadow: ${BOX_SHADOW_HOVER};
      outline: none !important;
    }
  }
`;
