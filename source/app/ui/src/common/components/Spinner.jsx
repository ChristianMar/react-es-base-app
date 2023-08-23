import React from 'react';
import { CircularProgress } from '@mui/material';

import { SpinnerContainer } from './UISpinner';

export const Spinner = ({
  color,
  size,
  style,
  thickness,
  value,
  styleContainer,
}) => {
  return (
    <SpinnerContainer style={styleContainer}>
      <CircularProgress
        color={color}
        size={size}
        style={style}
        thickness={thickness}
        value={value}
      />
    </SpinnerContainer>
  );
};
