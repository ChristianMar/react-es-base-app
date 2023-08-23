import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { StoreLayout } from '../../main/src/layouts/StoreLayout';

ReactDOM.render(
  <HashRouter>
    <StoreLayout />
  </HashRouter>,
  document.getElementById('root')
);
