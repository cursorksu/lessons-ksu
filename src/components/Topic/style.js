import styled from '@emotion/styled';

export const TopicStyled = styled.div`
  text-align: left;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      padding: 0;
      margin: 0;

      &:before {
        content: '\\21E8';
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
`;
