import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Tooltip } from "@mui/material";
import { EditModal } from "../../EditModal";
import { ButtonIconStyled } from "../../ButtonStyled";
import { ReactComponent as PrintIcon } from "../../../assets/print.svg";
import { TopicToPrint } from "../../ComponentsToPrint";

export const TabPanelTopic = ({ value, show, lesson }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return show ? (
    <div>
      <div className="btn-wrapper">
        <Tooltip title="Змінити цей урок">
          <EditModal fieldName="title" />
        </Tooltip>
        <Tooltip title="Надрукувати цей урок">
          <ButtonIconStyled onClick={handlePrint}>
            <PrintIcon />
          </ButtonIconStyled>
        </Tooltip>
      </div>
      <TopicToPrint ref={componentRef} lesson={lesson} />
    </div>
  ) : (
    <></>
  );
};
