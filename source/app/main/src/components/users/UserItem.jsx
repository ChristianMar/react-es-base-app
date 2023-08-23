import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AllUsersContext } from '../../context/AllUsersContext';
import {
  useGetUsersQuery,
  usersSelectors,
  usersAdapter,
} from '../../store/slices/usersSlice';
import { UserItem as UserItemUI } from '@ui/main/users/UserItem';

export const UserItem = ({ userId }) => {
  const allUsersContext = useContext(AllUsersContext);
  const navigate = useNavigate();
  const { user } = useGetUsersQuery(
    {
      limit: allUsersContext.limit,
      page: allUsersContext.page,
    },
    {
      selectFromResult: (result) => {
        return {
          user: usersSelectors.selectById(
            !result.data ? usersAdapter.getInitialState() : result.data.users,
            userId
          ),
        };
      },
    }
  );

  const onShowUserPost = (id, username) => {
    navigate('/app/users_post', { state: { id: id, username: username } });
  };

  return <UserItemUI user={user} onShowUserPost={onShowUserPost} />;
};
