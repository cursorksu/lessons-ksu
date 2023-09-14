import React from "react";
import { Card } from "../Card";
import { EditTextModal } from "../EditTextModal";
import { Box, Grid } from "@mui/material";
import { EditModal } from "../EditModal";
import { DisplayTopic } from "../DisplayTopic";
// import { Topic } from "../Topic";

export const TopicToPrint = React.forwardRef(({ lesson }, ref) => {
  return (
    <Grid container ref={ref}>
      <Grid
        item
        sm={12}
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <h1>{lesson?.title}</h1>
      </Grid>
      <Grid item sm={3} sx={{ paddingRight: "12px" }}>
        <Card
          title="Цель урока"
          action={
            <Box className="action">
              <EditModal fieldName={"goal"} fieldData={lesson?.goal} />
            </Box>
          }
        >
          {lesson?.goal}
        </Card>
        <Card
          title="Золотой стих"
          action={
            <Box className="action">
              {lesson?.quote}
              <EditModal fieldName={"bible"} fieldData={lesson?.bible} />
            </Box>
          }
        >
          {lesson?.bible}
        </Card>
        <Card
          title="Материалы к уроку"
          action={
            <Box className="action">
              <EditModal fieldName={"quote"} fieldData={lesson?.quote} />
            </Box>
          }
        >
          {lesson?.quote}
        </Card>
        <Card
          title="В этом уроке:"
          action={
            <Box className="action">
              <EditModal fieldName={"list"} fieldData={lesson?.list} />
            </Box>
          }
        >
          {lesson?.list?.map((el, idx) => (
            <Box sx={{ textAlign: "left" }} key={el?.id}>
              <b>{++idx}</b>. {el?.value}
            </Box>
          ))}
        </Card>
      </Grid>
      <Grid item sm={9}>
        <Card
          title="История"
          action={<EditTextModal topicId={lesson?.topic} />}
        >
          <DisplayTopic topicId={lesson?.topic} />
        </Card>
      </Grid>
    </Grid>
  );
});
