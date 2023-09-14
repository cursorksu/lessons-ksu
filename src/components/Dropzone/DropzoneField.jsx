import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { FormLabel } from '@mui/material';
import { resizeFile } from '../../utils/resizeFile';
import { InputFieldStyled, TextareaAutosizeStyled } from '../InputStyled';

import { UvDropzoneStyled, StyledDropzoneBody } from './styles';

export const DropzoneField = ({ onChange }) => {
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

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
  }, [image, description, onChange]);

  return (
    <>
      <StyledDropzoneBody>
        {!image && (
          <Dropzone onDrop={onDrop} multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <UvDropzoneStyled className="avatar">
                <div {...getRootProps()}>
                  <input {...getInputProps()} accept=".png,.jpg" />
                  <span className="accent">+ Додати зображення</span>
                </div>
              </UvDropzoneStyled>
            )}
          </Dropzone>
        )}
        {image && (
          <UvDropzoneStyled className="placeholder">
            <img src={image} alt={image} />
          </UvDropzoneStyled>
        )}
        <InputFieldStyled>
          <FormLabel className="label">Опис до зображення</FormLabel>
          <TextareaAutosizeStyled
            name="img-description"
            placeholder="Додайте опис, якщо треба"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputFieldStyled>
      </StyledDropzoneBody>
    </>
  );
};
