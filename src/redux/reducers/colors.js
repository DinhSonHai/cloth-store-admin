import {
  GET_ALL_COLORS
} from '../types';

const initialState = {
  colors: [],
  total: 0,
  color: null
};

export default function colors(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_COLORS:
      return {
        ...state,
        colors: payload,
        total: payload.length
      }
    default:
      return state;
  }
}
