import styled from "@emotion/styled";
import { Card } from "@mui/material";
import { GOLD } from "../../constants/colors";

export const LessonCardStyled = styled(Card)`
  width: 100%;
  height: 200px;
  overflow: hidden;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;

  .MuiButton-root {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
  }

  .img-wrapper {
    overflow: hidden;
    flex-basis: 200px;
  }

  .content-wrapper {
    max-width: calc(100% - 200px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    overflow: hidden;

    .title {
      max-width: 100%;

      p {
        max-width: 100%;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        max-height: 3.6em;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .bible {
      max-width: 100%;
      background: ${GOLD};
      padding-top: 0;

      i {
        font-weight: 700;
      }

      p {
        max-width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
  img {
    height: 200px;
    width: 200px;
    object-fit: cover;
    object-position: center;
    transform: scale(1);
    transition: transform 0.4s ease-in-out;
  }

  &:hover {
    img {
      transform: scale(1.3);
    }
  }
`;
