import React from 'react';
import { format } from 'date-fns';
import { Button, IconButton } from '@mui/material';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import { useTranslate } from 'react-polyglot';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  PostBig,
  PostBigContent,
  PostBigDescription,
  PostBigImage,
  PostBigImageContent,
  PostBigTitle,
  PostUsername,
  BackButton,
  PostButton,
} from './UIPosts';
import { Spinner } from '../../common/components/Spinner';
import { ErrorList } from '../../common/components/ErrorList';

export const Post = ({
  post,
  onShowUserPost,
  loading,
  error,
  loadingDelete,
  errorDelete,
  onGoBack,
  userId,
  onEditPost,
  onDeletePost,
}) => {
  const t = useTranslate();
  const item = !post ? null : post.post;

  return (
    <React.Fragment>
      <ErrorList errors={error || errorDelete} />
      <BackButton>
        {!onGoBack ? null : (
          <Button startIcon={<ArrowBackIos />} onClick={onGoBack}>
            {t('common.back')}
          </Button>
        )}
        {!item ? null : userId !== item.userId ? null : (
          <PostButton>
            <IconButton onClick={onDeletePost}>
              {!loadingDelete ? <DeleteIcon /> : <Spinner size={25} />}
            </IconButton>
            <IconButton onClick={onEditPost}>
              <EditIcon />
            </IconButton>
          </PostButton>
        )}
      </BackButton>
      {loading ? (
        <Spinner />
      ) : !item ? null : (
        <PostBig>
          {!item.image ? null : (
            <PostBigImage>
              <PostBigImageContent src={item.image} />
            </PostBigImage>
          )}
          <PostBigTitle>{item.title}</PostBigTitle>
          <PostBigContent>{item.post}</PostBigContent>
          <PostBigDescription>
            {format(new Date(item.createdAt), 'yyyy-MM-dd HH:mm')}
            <PostUsername
              onClick={() =>
                onShowUserPost(
                  !item.user ? null : item.user.id,
                  !item.user ? null : item.user.username
                )
              }
            >
              {!item.user ? '' : item.user.username}
            </PostUsername>
          </PostBigDescription>
        </PostBig>
      )}
    </React.Fragment>
  );
};
