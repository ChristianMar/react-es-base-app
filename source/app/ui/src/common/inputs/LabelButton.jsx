import React from 'react';
import { Spinner } from '../components/Spinner';

export const LabelButton = ({
  label,
  loading,
  spinnerSize,
  spinnerThickness,
  spinnerColor,
}) => {
  return (
    <span
      style={{
        display: 'inherit',
        alignItems: 'inherit',
        justifyContent: 'inherit',
      }}
    >
      {loading ? (
        <Spinner
          size={spinnerSize ? spinnerSize : 21}
          thickness={spinnerThickness ? spinnerThickness : 2}
          color={spinnerColor ? spinnerColor : 'inherit'}
        />
      ) : (
        label
      )}
    </span>
  );
};
