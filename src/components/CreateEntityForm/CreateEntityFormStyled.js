import styled from '@emotion/styled';
import { BOX_SHADOW, PRIMARY_MAIN } from '../../constants/colors';

export const CreateEntityFormStyled = styled('div')`
  background: #fff;
  padding: 40px;
  border-top: 1px solid ${PRIMARY_MAIN};
  
  &.aside {
    padding: 0 0 0 0;
    border: none;
  }
  
  &.sticky {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 90;
    box-shadow: ${BOX_SHADOW};
  }
  
  .d-flex {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0;
  }
  
  .avatar {
    border: 1px solid ${PRIMARY_MAIN};
    border-radius: 50%;
    margin-right: 40px;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      margin: 0;
    }
  }
    
  .aside-form {
    display: grid;
    grid-gap: 10px;
    margin: 20px 0;
    grid-template-columns: 160px 1fr;
    grid-template-areas: 
      "o o o o o"
      "a b b b b"
      "a c c c c"
      "a d d d d"
      "e e e e e";

    [name="lesson"] {
      grid-area: o;
    }
    [name="image"] {
      grid-area: a;
    }
    [name="title"] {
      grid-area: b;
    }
    [name="tags"] {
      grid-area: c;
    }
    [name="imageUrl"] {
      grid-area: d;
    }
    [name="text"] {
      grid-area: e;
    }
  }
    .content-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-row-gap: 10px;
        grid-column-gap: 20px;
        margin-bottom: 20px;
        grid-template-areas: 
              "a b c"
              "a b c"
              "a d e" 
              "a d e" 
              "a f g" 
              "a f g"
              "a h j"
              "a h j" 
              "k l m" 
              "k l m"
              "n o p"
              "n o p";
      
      & > :first-of-type {
        grid-area: a;
      }
      
      & > *:nth-of-type(2) {
        grid-area: b;
      }
      & > *:nth-of-type(3) {
        grid-area: c;
      }
      & > *:nth-of-type(4) {
        grid-area: d;
      }
      & > *:nth-of-type(5) {
        grid-area: e;
      }
      & > *:nth-of-type(6) {
        grid-area: f;
      }
      & > *:nth-of-type(7) {
        grid-area: g;
      }
      & > *:nth-of-type(8) {
        grid-area: h;
      }
      & > *:nth-of-type(9) {
        grid-area: j;
      }
      & > *:nth-of-type(10) {
        grid-area: k;
      }
      & > *:nth-of-type(11) {
        grid-area: l;
      }
      & > *:nth-of-type(12) {
        grid-area: m;
      }
      & > *:nth-of-type(13) {
        grid-area: n;
      }
      & > *:nth-of-type(14) {
        grid-area: o;
      }
      & > *:nth-of-type(15) {
        grid-area: p;
      }
      & > *:nth-of-type(16) {
        grid-area: r;
      }
    }
  
  


`;
