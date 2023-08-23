import React, { createContext, useState } from 'react';

export const AllPostsContext = createContext({
  page: 1,
  limit: 50,
  loadingCreate: false,
  loadingEdit: false,
  loadingDelete: false,
  loadNextPosts: () => {
    return;
  },
  loadPrevPosts: () => {
    return;
  },
  loadPagePosts: (arg0) => {
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

export const AllPostsContextProvider = ({ children }) => {
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

  const loadPagePosts = (pg) => {
    setPage(pg);
  };

  const loadNextPosts = () => {
    setPage(page + 1);
  };

  const loadPrevPosts = () => {
    setPage(page - 1);
  };

  return (
    <AllPostsContext.Provider
      value={{
        page: page,
        limit: limit,
        loadingCreate: createPost,
        loadingEdit: editPost,
        loadingDelete: deletePost,
        loadNextPosts: loadNextPosts,
        loadPrevPosts: loadPrevPosts,
        loadPagePosts: loadPagePosts,
        changeCreate: changeCreate,
        changeDelete: changeDelete,
        changeEdit: changeEdit,
      }}
    >
      {children}
    </AllPostsContext.Provider>
  );
};
