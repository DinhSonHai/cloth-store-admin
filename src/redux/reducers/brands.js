import {
  GET_ALL_BRANDS
} from '../types';

const initialState = {
  brands: [],
  total: 0,
  brand: null
};

export default function brands(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_BRANDS:
      return {
        ...state,
        brands: payload,
        total: payload.length
      }
    default:
      return state;
  }
}
