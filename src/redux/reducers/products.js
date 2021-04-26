import {
  GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID
} from '../types';

const initialState = {
  products: [],
  total: 0,
  product: null
};

export default function products(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: payload,
        total: payload.length
      }
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        product: payload
      }
    // case ADD_PRODUCT_SUCCESS:
    default:
      return state;
  }
}
