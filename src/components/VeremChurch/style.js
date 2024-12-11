import styled from '@emotion/styled';

export const VeremContentChurchItem = styled('div')`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
    
    h4 {
       text-align: left;
    }
    
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    display: block;
    margin-right: 20px;
  }

`;

export const ChurchItemStyled = styled('div')`
  font-size: 1em;
  line-height: 20px;
  font-family: 'Montserrat', sans-serif;
  color: #000;

  ul {
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
    text-align: left;
    
    li {
      margin-bottom: 10px;
    }
    
    span {
      font-weight: 700;
    }
  }

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 0;
  }
`;
