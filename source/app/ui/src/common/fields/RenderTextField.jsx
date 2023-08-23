import React from 'react';

import { Input } from '../inputs/Input';

export const RenderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...props
}) => {
  return (
    <Input
      label={label}
      error={touched && typeof error !== 'undefined'}
      helperText={touched && typeof error !== 'undefined' ? error : null}
      {...input}
      {...props}
    />
  );
};
