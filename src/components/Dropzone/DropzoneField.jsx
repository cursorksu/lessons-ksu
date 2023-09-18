import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { FormLabel } from '@mui/material';
import { resizeFile } from '../../utils/resizeFile';
import { InputFieldStyled, TextareaAutosizeStyled } from '../InputStyled';

import { UvDropzoneStyled, StyledDropzoneBody } from './styles';

export const DropzoneField = ({ field, onChange }) => {
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setImage(field.value);
    setDescription(field.description);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDrop = async (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const getUri = resizeFile(file);
      getUri &&
        getUri.then((preview) => {
          setImage(preview);
        });
    });
  };

  useEffect(() => {
    image &&
      onChange({
        value: image,
        description,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, description]);

  return (
    <StyledDropzoneBody>
      <Dropzone onDrop={onDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <UvDropzoneStyled>
            <div {...getRootProps()}>
              <input {...getInputProps()} accept=".png,.jpg" />
              {!image &&  <span className="accent">+ Додати зображення</span>}
              {image &&  <img src={image} alt={image} />}
            </div>
          </UvDropzoneStyled>
        )}
      </Dropzone>
      <InputFieldStyled>
        <FormLabel className="label">Опис до зображення</FormLabel>
        <TextareaAutosizeStyled
          rows={4}
          name="img-description"
          placeholder="Додайте опис, якщо треба"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </InputFieldStyled>
    </StyledDropzoneBody>
  );
};
