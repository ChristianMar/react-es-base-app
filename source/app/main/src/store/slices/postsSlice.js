import { createEntityAdapter } from '@reduxjs/toolkit';

import { postsApi } from '../api/postsApi';

export const postsAdapter = createEntityAdapter({
  selectId: (post) => post.id,
  sortComparer: (a, b) =>
    a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0,
});

export const userPostsAdapter = createEntityAdapter({
  selectId: (post) => post.id,
  sortComparer: (a, b) =>
    a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0,
});

const postsInitialState = {
  cursor: {},
  posts: postsAdapter.getInitialState({}),
};

const userPostsInitialState = {
  user: {},
  cursor: {},
  posts: userPostsAdapter.getInitialState({}),
};

export const extendedPostsSlice = postsApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (data) => ({
        url: '/posts/all_posts',
        method: 'POST',
        body: data,
        tagTypes: ['Posts'],
      }),
      transformResponse: (responseData) => {
        return {
          cursor: responseData.cursor,
          posts: postsAdapter.addMany(
            postsInitialState.posts,
            responseData.posts
          ),
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.posts.ids.map((id) => ({ type: 'Posts', id })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    getUserPosts: builder.query({
      query: (data) => ({
        url: '/posts/user_posts',
        method: 'POST',
        body: data,
        tagTypes: ['UserPost'],
      }),
      transformResponse: (responseData) => {
        return {
          user: responseData.user,
          cursor: responseData.cursor,
          posts: userPostsAdapter.addMany(
            userPostsInitialState.posts,
            responseData.posts
          ),
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.posts.ids.map((id) => ({
                type: 'UserPost',
                id,
              })),
              { type: 'UserPost', id: 'LIST' },
            ]
          : [{ type: 'UserPost', id: 'LIST' }],
    }),
    getPost: builder.query({
      query: (data) => ({
        url: '/posts/get_post',
        method: 'POST',
        body: data,
        tagTypes: ['Post'],
      }),
      transformResponse: (responseData) => responseData,
      providesTags: (result) => [{ type: 'Post', id: result?.id }],
    }),
    addPost: builder.mutation({
      query: (data) => ({
        url: '/posts/create_post',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Posts', 'Post', 'UserPost'],
    }),
    editPost: builder.mutation({
      query: (data) => ({
        url: '/posts/update_post',
        method: 'POST',
        body: data,
      }),
      transformResponse: (responseData, meta, arg) => {
        console.log(responseData, arg);
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Posts', id: arg.postId },
        { type: 'UserPost', id: arg.postId },
        'Post',
      ],
    }),
    deletePost: builder.mutation({
      query: (data) => ({
        url: '/posts/delete_post',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Posts', id: arg.postId },
        { type: 'UserPost', id: arg.postId },
        'Post',
      ],
    }),
  }),
});

export const postsSelectors = postsAdapter.getSelectors((state) => state);

export const userPostsSelectors = userPostsAdapter.getSelectors(
  (state) => state
);

export const {
  useGetPostsQuery,
  useGetUserPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  endpoints,
} = extendedPostsSlice;
