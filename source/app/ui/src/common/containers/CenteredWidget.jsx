import React from 'react';

import {
  Copyright,
  FormWrapper,
  LogWidget,
  LogWrapper,
  Title,
  TopImage,
} from './UICenteredWidget';
import { Spinner } from '../components/Spinner';
import Footer from '../navigation/Footer';

export const CenteredWidget = ({
  image,
  title,
  loading,
  children,
  copyright,
}) => {
  return (
    <LogWrapper>
      <section>
        {!image ? null : <TopImage>{image}</TopImage>}
        <LogWidget>
          {title ? <Title>{title}</Title> : null}
          {loading ? (
            <Spinner size={32} thickness={3} />
          ) : (
            <FormWrapper>{children}</FormWrapper>
          )}
        </LogWidget>
        {!copyright ? null : (
          <Copyright>
            <Footer copyright={copyright} />
          </Copyright>
        )}
      </section>
    </LogWrapper>
  );
};
