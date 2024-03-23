import styled from '@emotion/styled';
import { CREAM, CHOCO, DARK_BG } from '../../constants/colors';

export const UserProfileStyled = styled.div`
    .top-container {
        padding: 40px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        background-color: ${DARK_BG};
    }

    .d-flex {
        display: flex;
        align-items: center;
    }

    img {
        margin-right: 40px;
        border: 1px solid ${CREAM};
    }

    .meta {
        font-family: "Coco Gothic Alternate", sans-serif;
        font-size: 18px;
        color: ${CHOCO};
        font-weight: 400;
    }
    .estimation {
        border: none;
        display: flex;
        align-items: center;
        height: 40px;
        h4 {
            margin: 0;
        }
        img {
            margin: 0;
            border: none;
            width: 46px;
            height: 46px;
            object-fit: contain;
        }
    }
`;