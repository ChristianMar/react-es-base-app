import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserPostsContext } from '../../context/UserPostsContext';
import { PostsList as PostsListUI } from '@ui/main/posts/PostsList';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { PostUserItem } from './PostUserItem';
import {
  useGetUserPostsQuery,
  userPostsSelectors,
  userPostsAdapter,
} from '../../store/slices/postsSlice';

export const PostsUserList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userPostsContext = useContext(UserPostsContext);

  const { isLoading, isFetching, isError, error } = useGetUserPostsQuery({
    limit: userPostsContext.limit,
    page: userPostsContext.page,
    userId: location.state.id,
  });

  const { user, cursor, postsIds } = useGetUserPostsQuery(
    {
      limit: userPostsContext.limit,
      page: userPostsContext.page,
      userId: location.state.id,
    },
    {
      selectFromResult: (result) => {
        return {
          user: !result.data ? null : result.data.user,
          cursor: !result.data ? null : result.data.cursor,
          postsIds: userPostsSelectors.selectIds(
            !result.data
              ? userPostsAdapter.getInitialState()
              : result.data.posts
          ),
        };
      },
    }
  );

  const loadNextPosts = () => {
    userPostsContext.loadNextUserPosts();
  };

  const loadPrevPosts = () => {
    userPostsContext.loadPrevUserPosts();
  };

  const onGoBack = () => {
    navigate(-1);
  };

  console.log(user);

  return (
    <PostsListUI
      loading={isLoading || isFetching}
      error={getErrorMessage(isError, error)}
      hasNext={!cursor ? null : cursor.next}
      hasPrev={!cursor ? null : cursor.prev}
      loadNextPosts={loadNextPosts}
      loadPrevPosts={loadPrevPosts}
      user={user}
      onGoBack={onGoBack}
    >
      {postsIds.map((postId) => (
        <PostUserItem key={postId} postId={postId} />
      ))}
    </PostsListUI>
  );
};
