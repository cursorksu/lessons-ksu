import React from 'react';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { ButtonIconStyled } from '../ButtonStyled';

export const UvFileItem = ({ file, handleRemove = () => null }) => {
  const getExe = (title) => {
    if (!title) return;
    const arr = title?.split('.');
    return arr[arr?.length - 1];
  };

  return (
    <div>
      <div
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <h2>
          <div component="span" mb={0.5}>
            {file?.file?.name?.split('.')[0]}
          </div>
          <div component="span" className="secondaryGray">
            .{file?.file?.name && getExe(file?.file?.name)}
          </div>
        </h2>
      </div>
      <div>
        {!file.progress || file?.progress === 100
          ? Math.round((file.file?.size / 1000000 + Number.EPSILON) * 100) /
              100 +
            'MB'
          : `${file.bytesTransferred} Kb of ${file.totalBytes} Kb`}
      </div>

      <ButtonIconStyled onClick={handleRemove}>
        <CloseIcon />
      </ButtonIconStyled>
    </div>
  );
};
