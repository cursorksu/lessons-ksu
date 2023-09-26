import React, { useCallback, useState } from 'react';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { DialogStyled } from '../DialogStyled';
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  FormHelperText,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { ReactComponent as AddCraftIcon } from '../../assets/addCreativity.svg';
import { InputStyled } from '../InputStyled';
import { PRIMARY_MAIN } from '../../constants/colors';
import { Transition } from '../Transition';
import { useSelector } from 'react-redux';

const INITIAL_LESSON = {
  title: '',
};

export const CreateModal = ({
  onSubmit,
  buttonText,
  modalTitle,
  label,
  placeholder,
  entity,
}) => {
  const { lesson } = useSelector((state) => state.lessonData);
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
      await onSubmit(data);
      setIsOpen(false);
      reset();
    },
    [onSubmit, setIsOpen, reset]
  );

  return (
    <>
      {!(lesson?.[entity]?.length) && (
        <ButtonStyled onClick={handleOpen}>
          <AddCraftIcon style={{ marginRight: '12px' }} />
          {buttonText}
        </ButtonStyled>
      )}
      <DialogStyled
        maxWidth={'600'}
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <form>
          <DialogTitle>
            {modalTitle}
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
                      {label}
                    </FormHelperText>
                    <InputStyled
                      id="title"
                      name="title"
                      placeholder={placeholder}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {formState.errors['title'] && (
                      <FormHelperText sx={{ color: PRIMARY_MAIN }}>
                        Потрібно заповнити це поле
                      </FormHelperText>
                    )}
                  </FormGroup>
                )}
              />
            </Box>
          </DialogContent>
          <DialogActions style={{ padding: '0 25px 25px' }}>
            <ButtonStyled onClick={handleClose}>Відмінити</ButtonStyled>
            <ButtonStyled onClick={handleSubmit(onSubmitHandler)}>
              Зберегти
            </ButtonStyled>
          </DialogActions>
        </form>
      </DialogStyled>
    </>
  );
};
