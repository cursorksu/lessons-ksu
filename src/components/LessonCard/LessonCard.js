import React from "react";
import { CardContent, Divider, Grid, Typography } from "@mui/material";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { ButtonIconStyled } from "../ButtonStyled";

import { LessonCardStyled } from "./style";

export const LessonCard = ({ item, onClick, onDelete }) => (
  <LessonCardStyled variant="outlined" onClick={() => onClick(item?.id)}>
    <Grid container>
      <Grid item className="img-wrapper">
        <ButtonIconStyled onClick={(e) => onDelete(e, item?.id)}>
          <DeleteIcon />
        </ButtonIconStyled>
        <img src={item?.img} alt={item?.title} />
      </Grid>
      <Grid item container className="content-wrapper">
        <CardContent className="title">
          <Typography component={() => <b>{item?.title}</b>}></Typography>
          <Typography level="body-sm">{item?.goal}</Typography>
        </CardContent>
        <CardContent orientation="horizontal" className="bible">
          <Divider inset="context" />
          <Typography level="body-xs" fontWeight="md">
            {item?.bible}
          </Typography>
          <Typography level="body-xs" fontWeight="md">
            <i>{item?.quote}</i>
          </Typography>
        </CardContent>
      </Grid>
    </Grid>
  </LessonCardStyled>
);
