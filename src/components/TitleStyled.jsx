import styled from '@emotion/styled';

export const TitleSmall = styled.div`
    margin: 0;
    padding: 0;
    font-family: Comfortaa, sans-serif;
    font-size: 22px;
    line-height: 2;
    font-weight: 700;
`;
export const TitleMedium = styled(TitleSmall)`
    font-size: 30px;
`;

export const TitleLarge = styled(TitleSmall)`
    font-size: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;