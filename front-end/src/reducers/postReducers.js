import { CREATE, FETCH_POSTS, FETCH_POST, DELETE_POST, UPDATE, POST_ERROR } from '../actions/type';

export default (state = [], action) => {
  switch (action.type) {
    case CREATE:
      return [...state, action.payload.data];
    case FETCH_POSTS:
      return action.payload;
    case FETCH_POST:
      return action.payload;
    case POST_ERROR:
      return action.payload;
    case DELETE_POST:
      return state.filter(state => state._id !== action.payload);
    case UPDATE:
      return state.map(post => (post._id === action.payload._id ? action.payload : post));
    default:
      return state;
  }
};
