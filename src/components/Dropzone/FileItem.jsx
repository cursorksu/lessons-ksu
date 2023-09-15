import React from 'react';
import { Box } from '@mui/material';
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <h2>
          <Box component="span" mb={0.5}>
            {file?.file?.name?.split('.')[0]}
          </Box>
          <Box component="span" className="secondaryGray">
            .{file?.file?.name && getExe(file?.file?.name)}
          </Box>
        </h2>
      </Box>
      <Box>
        {!file.progress || file?.progress === 100
          ? Math.round((file.file?.size / 1000000 + Number.EPSILON) * 100) /
              100 +
            'MB'
          : `${file.bytesTransferred} Kb of ${file.totalBytes} Kb`}
      </Box>

      <ButtonIconStyled onClick={handleRemove}>
        <CloseIcon />
      </ButtonIconStyled>
    </div>
  );
};
