import * as api from '../api';
import { CREATE, FETCH_POSTS, DELETE_POST, FETCH_POST, UPDATE, POST_ERROR } from './type';

export const createPost = postValues => async dispatch => {
  const createPost = await api.createPost(postValues);
  try {
    dispatch({
      type: CREATE,
      payload: createPost,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchPosts = () => async dispatch => {
  const fetchPosts = await api.fetchPosts();
  try {
    dispatch({
      type: FETCH_POSTS,
      payload: fetchPosts.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = id => async dispatch => {
  await api.deletePost(id);
  try {
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (error) {}
};

export const fetchPost = id => async dispatch => {
  const fetchPost = await api.fetchPost(id);
  try {
    dispatch({
      type: FETCH_POST,
      payload: fetchPost.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, postValues) => async dispatch => {
  const updatePost = await api.updatePost(id, postValues);
  dispatch({
    type: UPDATE,
    payload: updatePost.data,
  });
};

export const fetchSearchedTerm = searchValue => async dispatch => {
  try {
    const searchPosts = await api.searchPosts(searchValue);
    try {
      dispatch({
        type: FETCH_POSTS,
        payload: searchPosts.data,
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: 'No Memories Found.',
    });
  }
};
