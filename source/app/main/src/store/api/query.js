import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { Mutex } from 'async-mutex';
import regeneratorRuntime from 'regenerator-runtime';

import { logout, selectCurrentUser, setCredentials } from '../slices/userSlice';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.user.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithRefresh = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    const status = result.error.status;
    const message = result.error.data;
    if (status === 401 && message.message === 'TOKEN_EXPIRED') {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const user = selectCurrentUser(api.getState());
          const refreshResult = await baseQuery(
            {
              url: '/auth/refresh_token',
              method: 'POST',
              body: { username: user.username, password: user.password },
            },
            api,
            extraOptions
          );
          if (refreshResult.data) {
            api.dispatch(setCredentials(refreshResult.data));
            result = await baseQuery(args, api, extraOptions);
          } else {
            console.log('else');
            api.dispatch(logout());
          }
        } catch (e) {
          console.log('catch', e);
          api.dispatch(logout());
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
  }
  return result;
};

export default baseQueryWithRefresh;
