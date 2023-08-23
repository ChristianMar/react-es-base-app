import { createEntityAdapter } from '@reduxjs/toolkit';

import { usersApi } from '../api/usersApi';

export const usersAdapter = createEntityAdapter({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.username.localeCompare(b.username),
});

const initialState = {
  cursor: {},
  users: usersAdapter.getInitialState({}),
};

export const extendedUsersSlice = usersApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (data) => ({
        url: '/users/all_users',
        method: 'POST',
        body: data,
      }),
      transformResponse: (responseData) => {
        return {
          cursor: responseData.cursor,
          users: usersAdapter.addMany(initialState.users, responseData.users),
        };
      },
    }),
  }),
});

export const usersSelectors = usersAdapter.getSelectors((state) => state);

export const { useGetUsersQuery, endpoints } = extendedUsersSlice;
