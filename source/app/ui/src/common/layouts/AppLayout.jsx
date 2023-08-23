import { ThemeProvider } from '@emotion/react';
import React from 'react';

import customTheme from '../../styles/UITheme';

export const AppLayout = ({ children }) => {
  return <ThemeProvider theme={customTheme}>{children}</ThemeProvider>;
};
