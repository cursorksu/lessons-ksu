import React from "react";
import { Grid } from "@mui/material";
import { GoBackButton } from "../components/GoBackButton";
import { LessonTabs } from "../components/LessonTabs/LessonTabs";

export const Lesson = () => {
  return (
    <>
      <Grid item sm={2} />
      <Grid item sm={8} pt={3} className="App-header lessons">
        <GoBackButton />
        <LessonTabs />
      </Grid>
      <Grid item sm={2} />
    </>
  );
};
