import React from 'react';

import {
  UserItem as UserItemUI,
  UserElement,
  UserImage,
  UserImageContent,
  User,
  Username,
  Name,
} from './UIUsers';

export const UserItem = ({ user, onShowUserPost }) => {
  return (
    <UserItemUI>
      <UserElement>
        {!user || !user.avatar ? null : (
          <UserImage>
            <UserImageContent src={user.avatar} />
          </UserImage>
        )}
        <User full={!user || !user.avatar ? true : false}>
          <Username
            onClick={
              !onShowUserPost
                ? () => {
                    return;
                  }
                : () =>
                    onShowUserPost(
                      !user ? null : user.id,
                      !user ? null : user.username
                    )
            }
            clickable={!onShowUserPost ? false : true}
          >
            {!user ? '' : user.username}
          </Username>
          <Name>{`${!user ? '' : user.firstName} ${
            !user ? '' : user.lastName
          }`}</Name>
        </User>
      </UserElement>
    </UserItemUI>
  );
};
