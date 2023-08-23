import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AllPostsContext } from '../../context/AllPostsContext';
import { PostItem as PostItemUI } from '@ui/main/posts/PostItem';
import {
  useGetPostsQuery,
  postsSelectors,
  postsAdapter,
} from '../../store/slices/postsSlice';

export const PostItem = ({ postId }) => {
  const allPostsContext = useContext(AllPostsContext);
  const navigate = useNavigate();

  const { post } = useGetPostsQuery(
    {
      limit: allPostsContext.limit,
      page: allPostsContext.page,
    },
    {
      selectFromResult: (result) => {
        return {
          post: postsSelectors.selectById(
            !result.data ? postsAdapter.getInitialState() : result.data.posts,
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
