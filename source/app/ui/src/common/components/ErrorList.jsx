import React from 'react';

import { ErrorWrapper, ErrorListUl, ErrorListLi } from './UIErrorList';

export const ErrorList = ({ errors }) => {
  return (
    <ErrorWrapper>
      <ErrorListUl>
        <ErrorListLi>{errors ? errors.message : null}</ErrorListLi>
      </ErrorListUl>
    </ErrorWrapper>
  );
};
