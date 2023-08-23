import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Post as PostUI } from '@ui/main/posts/Post';
import { getErrorMessage } from '../../utils/getErrorMessage';
import {
  useDeletePostMutation,
  useGetPostQuery,
} from '../../store/slices/postsSlice';
import { selectCurrentUser } from '@main/store/slices/userSlice';
import { ModalContext } from '@main/context/ModalContext';

export const Post = () => {
  const modalContext = useContext(ModalContext);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoading, isFetching, isError, error, data } = useGetPostQuery({
    postId: location.state.id,
  });
  const [
    deletePost,
    {
      isLoading: isLoadingDelete,
      isSuccess,
      isError: isErrorDelete,
      error: errorDelete,
    },
  ] = useDeletePostMutation();

  useEffect(() => {
    if (isLoadingDelete === false && isSuccess === true) navigate(-1);
  }, [isLoadingDelete]);

  const onShowUserPost = (id, username) => {
    navigate('/app/users_post', { state: { id: id, username: username } });
  };

  const onGoBack = () => {
    navigate(-1);
  };
  const onEditPost = () => {
    modalContext.handleOpen('EDIT_POST', { post: data?.post });
  };

  const onDeletePost = () => {
    deletePost({ postId: location.state.id });
  };

  return (
    <PostUI
      post={data}
      onShowUserPost={onShowUserPost}
      loading={isLoading || isFetching}
      error={getErrorMessage(isError, error)}
      loadingDelete={isLoadingDelete}
      errorDelete={getErrorMessage(isErrorDelete, errorDelete)}
      onGoBack={onGoBack}
      userId={user.id}
      onEditPost={onEditPost}
      onDeletePost={onDeletePost}
    />
  );
};
