import { createApi } from '@reduxjs/toolkit/query/react';

import baseQueryWithRefresh from './query';

export const usersApi = createApi({
  reducerPath: 'allUsers',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['Users'],
  endpoints: (builder) => ({}),
});
