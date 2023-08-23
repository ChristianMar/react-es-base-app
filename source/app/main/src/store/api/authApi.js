import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { saveState } from '../../utils/reduxSyncStorage';
import { setCredentials } from '../slices/userSlice';

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/auth',
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const response = await queryFulfilled;
        saveState({ user: { user: response.data } });
        dispatch(setCredentials(response.data));
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
