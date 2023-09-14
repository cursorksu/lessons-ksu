import React, { useCallback, useState } from "react";
import { ButtonIconStyled, ButtonStyled } from "../ButtonStyled";
import { DialogStyled } from "../DialogStyled";
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  FormHelperText,
  Slide,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import { InputContrastStyled, TextareaAutosizeStyled } from "../InputStyled";
import { PRIMARY_MAIN } from "../../constants/colors";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const INITIAL_LESSON = {
  title: "",
  img: "",
  goal: "",
  bible: "",
  quote: "",
};

export const CreateLessonModal = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const { handleSubmit, reset, control, formState } = useForm({
    defaultValues: INITIAL_LESSON,
  });

  const handleClose = useCallback(() => {
    setIsOpen(false);
    reset();
  }, [reset]);

  const onSubmitHandler = useCallback(
    async (data) => {
      try {
        await onSubmit(data);
        setIsOpen(false);
        reset();
      } catch (e) {
        console.log(e);
      }
    },
    [onSubmit, setIsOpen, reset],
  );

  return (
    <>
      <ButtonStyled variant="outlined" onClick={handleOpen}>
        + Добавить урок
      </ButtonStyled>
      <DialogStyled
        maxWidth={"600"}
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <form>
          <DialogTitle>
            Название урока {}
            <ButtonIconStyled onClick={handleClose}>
              <CloseIcon />
            </ButtonIconStyled>
          </DialogTitle>
          <DialogContent>
            <Box>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <FormGroup>
                    <FormHelperText htmlFor="title" color="secondary">
                      Название урока
                    </FormHelperText>
                    <InputContrastStyled
                      id="title"
                      name="title"
                      placeholder="Название урока"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {formState.errors["title"] && (
                      <FormHelperText sx={{ color: PRIMARY_MAIN }}>
                        Поле не должно быть пустым
                      </FormHelperText>
                    )}
                  </FormGroup>
                )}
              />
            </Box>
            <Box>
              <Controller
                name="img"
                control={control}
                render={({ field }) => (
                  <FormGroup>
                    <FormHelperText htmlFor="img" color="secondary">
                      Изображение
                    </FormHelperText>
                    <InputContrastStyled
                      id="img"
                      name="img"
                      placeholder="Вставьте ссылку на изображение"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {formState.errors["img"] && (
                      <FormHelperText sx={{ color: PRIMARY_MAIN }}>
                        Поле не должно быть пустым
                      </FormHelperText>
                    )}
                  </FormGroup>
                )}
              />
            </Box>
            <Box>
              <Controller
                name="goal"
                control={control}
                render={({ field }) => (
                  <FormGroup>
                    <FormHelperText htmlFor="goal" color="secondary">
                      Название урока
                    </FormHelperText>
                    <TextareaAutosizeStyled
                      id="goal"
                      name="goal"
                      placeholder="Основная мысль урока"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {formState.errors["goal"] && (
                      <FormHelperText sx={{ color: PRIMARY_MAIN }}>
                        Поле не должно быть пустым
                      </FormHelperText>
                    )}
                  </FormGroup>
                )}
              />
            </Box>
            <Box>
              <Controller
                name="bible"
                control={control}
                render={({ field }) => (
                  <FormGroup>
                    <FormHelperText htmlFor="bible" color="secondary">
                      Место из бибилии
                    </FormHelperText>
                    <TextareaAutosizeStyled
                      id="bible"
                      name="bible"
                      placeholder="Основное место из Библии"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {formState.errors["bible"] && (
                      <FormHelperText sx={{ color: PRIMARY_MAIN }}>
                        Поле не должно быть пустым
                      </FormHelperText>
                    )}
                  </FormGroup>
                )}
              />
            </Box>
            <Box>
              <Controller
                name="quote"
                control={control}
                render={({ field }) => (
                  <FormGroup>
                    <FormHelperText htmlFor="quote" color="secondary">
                      Ссылка
                    </FormHelperText>
                    <InputContrastStyled
                      id="quote"
                      name="quote"
                      placeholder="В каком стихе это написано"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {formState.errors["quote"] && (
                      <FormHelperText sx={{ color: PRIMARY_MAIN }}>
                        Поле не должно быть пустым
                      </FormHelperText>
                    )}
                  </FormGroup>
                )}
              />
            </Box>
          </DialogContent>
          <DialogActions style={{ padding: "0 25px 25px" }}>
            <ButtonStyled onClick={handleClose}>Отменить</ButtonStyled>
            <ButtonStyled onClick={handleSubmit(onSubmitHandler)}>
              Создать
            </ButtonStyled>
          </DialogActions>
        </form>
      </DialogStyled>
    </>
  );
};
