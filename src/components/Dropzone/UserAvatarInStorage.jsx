import React from 'react';
import { UvDropzoneStyled } from './styles';
import Dropzone from 'react-dropzone';
import { resizeFile } from '../../utils/resizeFile';
import { useImages } from '../../api/images/useImages';
import { useTranslation } from 'react-i18next';

export const UserAvatarInStorage = ({ onChange, file, folder }) => {
  const { uploadImage } = useImages();
  const { t } = useTranslation('tr');

  const onDrop = async (acceptedFiles) => {
    let updatedFile = file;
    for (const file of acceptedFiles) {
      const preview = await resizeFile(file, undefined, undefined, 40);
      const downloadURL = await uploadImage(file, folder);
      updatedFile = {
        ...file,
        path: file.path,
        name: file.name,
        size: file.size,
        preview,
        downloadURL,
      };
    }
    await onChange(updatedFile);
  };

  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <UvDropzoneStyled className="user-avatar">
          <div {...getRootProps()}>
            <input {...getInputProps()} accept=".png,.jpg,.svg"/>
            <span className="accent">+ {t('button.uploadPhoto')}</span>
          </div>
        </UvDropzoneStyled>
      )}
    </Dropzone>
  );
};
