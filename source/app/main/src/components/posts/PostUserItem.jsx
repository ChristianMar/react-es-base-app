import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { UserPostsContext } from '../../context/UserPostsContext';
import { PostItem as PostItemUI } from '@ui/main/posts/PostItem';
import {
  useGetUserPostsQuery,
  userPostsSelectors,
  userPostsAdapter,
} from '../../store/slices/postsSlice';

export const PostUserItem = ({ postId }) => {
  const location = useLocation();
  const userPostsContext = useContext(UserPostsContext);
  const navigate = useNavigate();

  const { post } = useGetUserPostsQuery(
    {
      limit: userPostsContext.limit,
      page: userPostsContext.page,
      userId: location.state.id,
    },
    {
      selectFromResult: (result) => {
        return {
          post: userPostsSelectors.selectById(
            !result.data
              ? userPostsAdapter.getInitialState()
              : result.data.posts,
            postId
          ),
        };
      },
    }
  );

  const onShowUserPost = (id, username) => {
    navigate('/app/users_post', { state: { id: id, username: username } });
  };

  const onShowPost = (id) => {
    navigate('/app/post', { state: { id: id } });
  };

  return (
    <PostItemUI
      post={post}
      onShowUserPost={onShowUserPost}
      onShowPost={onShowPost}
    />
  );
};
