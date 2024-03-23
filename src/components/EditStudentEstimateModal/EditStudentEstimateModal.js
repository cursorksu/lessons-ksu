import {FormField, Popup} from "semantic-ui-react";
import { InputStyled, LabelStyled } from "../InputStyled";
import { ButtonStyled } from "../ButtonStyled";
import { useState } from "react";
import {useTranslation} from "react-i18next";
import {EstimationModalStyled} from "./EstimationModalStyled";

export const EditStudentEstimateModal = ({ onConfirm, studentName }) => {
  const { t} = useTranslation('tr');
  const [estimation, setEstimation,] = useState(0);
  const [isOpen, setIsOpen,] = useState(false);
  const confirmationHandler = async () => {
    await onConfirm(+estimation);
    setIsOpen(false);
    setEstimation(0);
  };
  return (
    <Popup
      open={isOpen}
      content={(
        <EstimationModalStyled>
          <FormField>
            <LabelStyled htmlFor="estime">Наберіть кількість динариків, яку отримає {studentName} </LabelStyled>
            <InputStyled
              name="estime"
              type="number"
              step="1"
              value={estimation}
              onChange={({target}) => setEstimation(target.value)}
            />
          </FormField>
          <div className="action">
            <ButtonStyled onClick={() => setIsOpen(false)}>{t('button.cancel')}</ButtonStyled>
            <ButtonStyled onClick={confirmationHandler}>{t('button.accept')}</ButtonStyled>
          </div>
        </EstimationModalStyled>
  
      )}
      on='click'
      pinned
      trigger={(
        <div role="button" onClick={() => setIsOpen(true)}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fcoin.png?alt=media&token=6b26e6f8-1b2b-4d0d-bd29-69ebca27cc20"
            alt="coin"/>
        </div>
      )}
    />
  );
};