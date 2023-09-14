import React from "react";
import { Grid } from "@mui/material";
import { GoBackButton } from "../components/GoBackButton";
import { LessonList } from "../components/LessonList";

export const LessonsPage = () => {
  return (
    <>
      <Grid item sm={2} />
      <Grid item sm={8} pt={3} className="lessons">
        <GoBackButton />
        <h1>Передріздвяний спрінт</h1>
        <LessonList />
      </Grid>
      <Grid item sm={2} />
    </>
  );
};
