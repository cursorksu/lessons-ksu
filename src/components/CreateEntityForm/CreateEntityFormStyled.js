import styled from '@emotion/styled';
import { PRIMARY_MAIN } from '../../constants/colors';

export const CreateEntityFormStyled = styled('div')`
  background: #fff;
  padding: 40px;
  border-top: 1px solid ${PRIMARY_MAIN};
  
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
      
      & > *:nth-child(2) {
        grid-area: b;
      }
      & > *:nth-child(3) {
        grid-area: c;
      }
      & > *:nth-child(4) {
        grid-area: d;
      }
      & > *:nth-child(5) {
        grid-area: e;
      }
      & > *:nth-child(6) {
        grid-area: f;
      }
      & > *:nth-child(7) {
        grid-area: g;
      }
      & > *:nth-child(8) {
        grid-area: h;
      }
      & > *:nth-child(9) {
        grid-area: j;
      }
      & > *:nth-child(10) {
        grid-area: k;
      }
      & > *:nth-child(11) {
        grid-area: l;
      }
      & > *:nth-child(12) {
        grid-area: m;
      }
      & > *:nth-child(13) {
        grid-area: n;
      }
      & > *:nth-child(14) {
        grid-area: o;
      }
      & > *:nth-child(15) {
        grid-area: p;
      }
      & > *:nth-child(16) {
        grid-area: r;
      }
    }
  
  


`;
