import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { NoMatch } from './NoMatch';
import { Navbar } from './Navbar';
import { PostsList } from '../components/posts/PostsList';
import { Post } from '../components/posts/Post';
import { PostsUserList } from '../components/posts/PostsUserList';
import { UsersList } from '../components/users/UsersList';
import { PostsProfileList } from '../components/posts/PostsProfileList';
import { AllUsersContextProvider } from '../context/AllUsersContext';
import { AllPostsContextProvider } from '../context/AllPostsContext';
import { UserPostsContextProvider } from '../context/UserPostsContext';
import { ModalContextProvider } from '../context/ModalContext';

export const LoggedLayout = () => {
  return (
    <React.Fragment>
      <AllPostsContextProvider>
        <UserPostsContextProvider>
          <AllUsersContextProvider>
            <ModalContextProvider>
              <Navbar />
              <Routes>
                <Route path="posts" element={<PostsList />} />
                <Route path="profile" element={<PostsProfileList />} />
                <Route path="users_post" element={<PostsUserList />} />
                <Route path="users" element={<UsersList />} />
                <Route path="post" element={<Post />} />
                <Route path="*" element={<NoMatch />} />
              </Routes>
            </ModalContextProvider>
          </AllUsersContextProvider>
        </UserPostsContextProvider>
      </AllPostsContextProvider>
    </React.Fragment>
  );
};
