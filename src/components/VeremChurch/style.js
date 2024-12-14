import styled from '@emotion/styled';
import { CHOCO, VEREM_GOLD, VEREM_GOLD_BG } from '../../constants/colors';

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
     padding: 0 30px;
     margin-bottom: 40px;
     
     .group-link {
          font-size: 1em;
          line-height: 20px;
          font-family: 'Montserrat', sans-serif;
          color: ${VEREM_GOLD};
          font-weight: 600;
          text-align: center;
          display: block;
          width: 100%;
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
        font-size: 28px;
        line-height: 1.5;
        letter-spacing: 2px;
    }
  `;
export const ChurchItemStyled = styled('div')`
  font-size: 1em;
  line-height: 20px;
  font-family: 'Montserrat', sans-serif;
  color: #000;
  
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

  img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    border-radius: 0;
  }
`;

export const GoldButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  background: linear-gradient(90deg, #f0c674, ${VEREM_GOLD}, ${VEREM_GOLD}, #f0c674);
  background-size: 200%;
  color: white;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 700;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background 3s ease;

  &:hover {
    animation: slow-shine 3s infinite linear;
  }
  
  svg {
    width: 18px;
    height: 18px;
    display: inline-block;
    margin: 0 10px 0 0;
  }
  
  &:focus {
    outline: 2px solid ${VEREM_GOLD}; /* Золотистый outline при фокусе */
    outline-offset: 4px; /* Отступ для эстетичности */
  }

  &:active {
    outline: 2px solid ${VEREM_GOLD}; /* Золотистый outline при активации */
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3); /* Эффект вдавливания */
  }

  @keyframes slow-shine {
    0% {
      background-color: linear-gradient(90deg, #f0c674, ${VEREM_GOLD}, ${VEREM_GOLD}, #f0c674);
      background-position: 0% 0%;
    }
    100% {
      background-color: linear-gradient(90deg, #f0c674, ${VEREM_GOLD}, ${VEREM_GOLD}, #f0c674);
      background-position: 200% 200%;
    }
  }
`;


export const GoldIconButton = styled(GoldButton)`
  padding: 0;
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  
  svg {
    margin: 0;
  }
  
  &:hover {
    animation: slow-shine 2s infinite linear;
  }
`;

