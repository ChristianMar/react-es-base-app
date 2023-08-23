import React, { createContext, useState } from 'react';

export const AllUsersContext = createContext({
  page: 1,
  limit: 50,
  loadNextUser: () => {
    return;
  },
  loadPrevUser: () => {
    return;
  },
});

export const AllUsersContextProvider = ({ children }) => {
  const [page, setPage] = useState(1);

  const limit = 50;

  const loadNextUser = () => {
    setPage(page + 1);
  };

  const loadPrevUser = () => {
    setPage(page - 1);
  };

  return (
    <AllUsersContext.Provider
      value={{
        page: page,
        limit: limit,
        loadNextUser: loadNextUser,
        loadPrevUser: loadPrevUser,
      }}
    >
      {children}
    </AllUsersContext.Provider>
  );
};
