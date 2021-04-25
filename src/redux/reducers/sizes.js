import {
  GET_ALL_SIZES
} from '../types';

const initialState = {
  sizes: [],
  total: 0,
  size: null
};

export default function sizes(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_SIZES:
      return {
        ...state,
        sizes: payload,
        total: payload.length
      }
    default:
      return state;
  }
}
