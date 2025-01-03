import styled from '@emotion/styled';
import { CHOCO, VEREM_GOLD } from '../../constants/colors';

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


export const GroupItemStyled = styled('div')`
     border: 1px solid ${VEREM_GOLD};
     padding: 20px 30px 20px;
     margin: 40px 0;
     background: #fff;
     border-radius: 30px;
     
     .teacher-item {
        line-height: 40px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        
        &.empty {
          justify-content: center;
        }
        
        button {
          margin-right: 20px;
        }
     }
     
     .group-link {
          font-size: 1em;
          line-height: 20px;
          font-family: 'Comfortaa', sans-serif;
          color: ${VEREM_GOLD};
          font-weight: 600;
          text-align: center;
          display: block;
          width: 70%;
          padding: 10px;
          border-bottom: 1px solid ${VEREM_GOLD};
          transition: color 0.3s ease;

        &:hover {
          color: ${CHOCO}
             border-bottom: 1px solid ${CHOCO};
        }
     }
   
    .group-title {
        text-align: center;
        font-family: "Yeseva One", serif;
        font-size: 24px;
        font-weight: 400;
        line-height: 1.5;
        letter-spacing: 1px;
        margin-top: 0 !important;
    }
  `;
export const ChurchItemStyled = styled('div')`
  font-size: 1em;
  line-height: 20px;
  font-family: 'Comfortaa', sans-serif;
  color: #000;
  margin: 40px 0;
  
   .avatar-placeholder {
      object-fit: contain;
      width: 60%;
      object-position: center center;
      display: block;
      margin: auto;
   }

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
  
  h3 {
    margin: 0 !important;
  }

  img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    border-radius: 0;
  }
`;