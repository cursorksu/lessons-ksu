import styled from '@emotion/styled';
import { GOLD, PRIMARY_MAIN, TOMATO } from '../../constants/colors';

export const TopicStyled = styled.div`
  text-align: left;
  
  h3 {
    border-bottom: none;
  }

  .hr {
    width: calc(100% - 40px);
    height: 1px;
    background-color: ${TOMATO};
    margin: 20px;
  }

  .dictionary {
    position: relative;
    padding-bottom: 12px;
    margin-bottom: 12px;
    
    &:after {
      content: '';
      width: 70%;
      height: 1px;
      background: ${GOLD};
      position: absolute;
      right: 0;
      bottom: 0;
      display: block;
    }
    .declaration {
      font-weight: 700;
      color: ${GOLD};
      
      &:after {
        content: "\\2015";
        display: inline-block;
        margin-left: 12px;
      }
    }
    .text {
      font-weight: 300;
      padding-left: 80px;
    }
  }

  .date-holder {
    width: auto;
    display: inline-block;
    background: ${TOMATO};
    padding: 8px;
    color: white;
    font-style: italic;
    border-radius: 4px;
  }

  .link-holder {
    color: ${PRIMARY_MAIN};
    font-weight: 300;
    text-decoration: none;
    font-style: italic;
  }
  
  .image-holder img{
    width: 100%;
    height: 380px;
    object-fit: cover;
  }
  
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      padding: 0;
      margin: 0 0 8px 0;

      &:before {
        content: "\\2015";
        display: inline-block;
        margin-right: 12px;
      }
    }
  }
`;
