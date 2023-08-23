import React from 'react';
import { TextField } from '@mui/material';

export const Input = ({
  error,
  helperText,
  style,
  margin,
  placeholder,
  children,
  label,
  value,
  fullWidth,
  InputLabelProps,
  InputProps,
  disabled,
  classes,
  ...rest
}) => {
  return (
    <TextField
      label={label}
      classes={classes}
      placeholder={placeholder}
      margin={margin ? margin : 'dense'}
      style={{
        ...style,
      }}
      value={value}
      children={children}
      {...rest}
      fullWidth={fullWidth}
      error={error}
      helperText={<span id={!error ? '' : '__input_error'}>{helperText}</span>}
      InputLabelProps={InputLabelProps}
      InputProps={InputProps}
      disabled={disabled}
    />
  );
};
