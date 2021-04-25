import {
  GET_ALL_CATEGORIES
} from '../types';

const initialState = {
  categories: [],
  total: 0,
  category: null
};

export default function categories(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: payload,
        total: payload.length
      }
    default:
      return state;
  }
}
