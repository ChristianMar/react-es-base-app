import React from 'react';
import { Form } from 'react-final-form';
import { useTranslate } from 'react-polyglot';

import { LoginWidget } from '@ui/main/auth/LoginWidget';
import { isRequired } from '../../utils/validationRules';
import { useLoginMutation } from '../../store/api/authApi';
import { getErrorMessage } from '../../utils/getErrorMessage';

export const Login = () => {
  const t = useTranslate();
  const [login, { isLoading, error, isError }] = useLoginMutation();

  const onLogin = (data) => {
    login(data);
  };

  return (
    <Form
      onSubmit={onLogin}
      validate={(values) => {
        const errors = {};
        errors['username'] = isRequired(
          t('validation.errors.required', { field: t('login.username') }),
          values['username']
        );
        errors['password'] = isRequired(
          t('validation.errors.required', { field: t('login.password') }),
          values['password']
        );
        return errors;
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <LoginWidget
            labels={{
              username: t('login.username'),
              password: t('login.password'),
              login: t('login.login'),
            }}
            onLogin={handleSubmit}
            loading={isLoading}
            error={getErrorMessage(isError, error)}
          />
        </form>
      )}
    />
  );
};
