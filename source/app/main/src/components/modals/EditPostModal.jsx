import React, { useEffect } from 'react';
import { Form } from 'react-final-form';
import { useTranslate } from 'react-polyglot';
import { useSelector } from 'react-redux';

import { useEditPostMutation } from '@main/store/slices/postsSlice';
import { isRequired } from '@main/utils/validationRules';
import { selectCurrentUser } from '@main/store/slices/userSlice';
import { getErrorMessage } from '@main/utils/getErrorMessage';
import { CreateEditPostModalWidget } from '@ui/main/modals/CreateEditPostModalWidget';

export const EditPostModal = ({ handleClose, options }) => {
  const user = useSelector(selectCurrentUser);
  const t = useTranslate();
  const [editPost, { isLoading, isSuccess, isError, error }] =
    useEditPostMutation();

  useEffect(() => {
    if (isLoading === false && isSuccess === true) {
      handleClose();
    }
  }, [isLoading]);

  const onSubmit = (data) => {
    editPost({ ...data, image: data.image === '' ? null : data.image });
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
        title: options.post.title,
        post: options.post.post,
        image: options.post.image,
        createdAt: options.post.createdAt,
        userId: user.id,
        postId: options.post.id,
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <CreateEditPostModalWidget
            labels={{
              modalTile: t('postModal.modalEditTile'),
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
