import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../store/store';
import { AppLayout } from './AppLayout';

export const StoreLayout = () => {
  return (
    <Provider store={store}>
      <AppLayout />
    </Provider>
  );
};
