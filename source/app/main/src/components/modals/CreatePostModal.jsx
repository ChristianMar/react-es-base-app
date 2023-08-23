import React, { useContext, useEffect } from 'react';
import { Form } from 'react-final-form';
import { useTranslate } from 'react-polyglot';
import { useSelector } from 'react-redux';

import { useAddPostMutation } from '@main/store/slices/postsSlice';
import { isRequired } from '@main/utils/validationRules';
import { selectCurrentUser } from '@main/store/slices/userSlice';
import { getErrorMessage } from '@main/utils/getErrorMessage';
import { CreateEditPostModalWidget } from '@ui/main/modals/CreateEditPostModalWidget';
import { AllPostsContext } from '@main/context/AllPostsContext';
import { UserPostsContext } from '@main/context/UserPostsContext';

export const CreatePostModal = ({ handleClose }) => {
  const allPostsContext = useContext(AllPostsContext);
  const userPostsContext = useContext(UserPostsContext);
  const user = useSelector(selectCurrentUser);
  const t = useTranslate();
  const [addPost, { isLoading, isSuccess, isError, error }] =
    useAddPostMutation();

  useEffect(() => {
    if (isLoading === false && isSuccess === true) {
      allPostsContext.loadPagePosts(1);
      userPostsContext.loadPageUserPosts(1);
      handleClose();
    }
  }, [isLoading]);

  const onSubmit = (data) => {
    addPost({ ...data, image: data.image === '' ? null : data.image });
  };

  return (
    <Form
      keepDirtyOnReinitialize
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};
        errors['title'] = isRequired(
          t('validation.errors.required', { field: t('postModal.title') }),
          values['title']
        );
        errors['post'] = isRequired(
          t('validation.errors.required', { field: t('postModal.post') }),
          values['post']
        );
        return errors;
      }}
      initialValues={{
        title: '',
        post: '',
        image: '',
        createdAt: new Date(),
        userId: user.id,
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <CreateEditPostModalWidget
            labels={{
              modalTile: t('postModal.modalTile'),
              title: t('postModal.title'),
              post: t('postModal.post'),
              image: t('postModal.image'),
              close: t('common.close'),
              save: t('common.save'),
            }}
            onSubmit={handleSubmit}
            onClose={handleClose}
            loading={isLoading}
            error={getErrorMessage(isError, error)}
          />
        </form>
      )}
    />
  );
};
