import React, { createContext, useState } from 'react';

export const UserPostsContext = createContext({
  page: 1,
  limit: 50,
  loadingCreate: false,
  loadingEdit: false,
  loadingDelete: false,
  loadNextUserPosts: () => {
    return;
  },
  loadPrevUserPosts: () => {
    return;
  },
  loadPageUserPosts: (arg0) => {
    return;
  },
  changeCreate: (arg0) => {
    return;
  },
  changeDelete: (arg0) => {
    return;
  },
  changeEdit: (arg0) => {
    return;
  },
});

export const UserPostsContextProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [createPost, setCreatePost] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  const [editPost, setEditPost] = useState(false);

  const limit = 50;

  const changeCreate = (loading) => {
    setCreatePost(loading);
  };

  const changeDelete = (loading) => {
    setDeletePost(loading);
  };

  const changeEdit = (loading) => {
    setEditPost(loading);
  };

  const loadPageUserPosts = (pg) => {
    setPage(pg);
  };

  const loadNextUserPosts = () => {
    setPage(page + 1);
  };

  const loadPrevUserPosts = () => {
    setPage(page - 1);
  };

  return (
    <UserPostsContext.Provider
      value={{
        page: page,
        limit: limit,
        loadingCreate: createPost,
        loadingEdit: editPost,
        loadingDelete: deletePost,
        loadNextUserPosts: loadNextUserPosts,
        loadPrevUserPosts: loadPrevUserPosts,
        loadPageUserPosts: loadPageUserPosts,
        changeCreate: changeCreate,
        changeDelete: changeDelete,
        changeEdit: changeEdit,
      }}
    >
      {children}
    </UserPostsContext.Provider>
  );
};
