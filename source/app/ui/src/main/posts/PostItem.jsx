import React from 'react';
import { format } from 'date-fns';

import {
  PostItem as PostItemUI,
  PostElement,
  PostImage,
  PostImageContent,
  Post as PostUI,
  PostTitle,
  PostContent,
  PostDescription,
  PostUsername,
} from './UIPosts';

export const PostItem = ({ post, onShowUserPost, onShowPost }) => {
  return (
    <PostItemUI>
      <PostElement>
        {!post.image ? null : (
          <PostImage>
            <PostImageContent src={post.image} />
          </PostImage>
        )}
        <PostUI full={!post.image ? true : false}>
          <PostTitle onClick={() => onShowPost(post.id)}>
            {post.title}
          </PostTitle>
          <PostContent>{post.post}</PostContent>
          <PostDescription>
            {format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm')}
            <PostUsername
              onClick={() =>
                onShowUserPost(
                  !post || !post.user ? null : post.user.id,
                  !post || !post.user ? null : post.user.username
                )
              }
            >
              {!post || !post.user ? '' : post.user.username}
            </PostUsername>
          </PostDescription>
        </PostUI>
      </PostElement>
    </PostItemUI>
  );
};
