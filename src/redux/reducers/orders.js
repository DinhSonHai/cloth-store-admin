import {
  GET_ALL_ORDERS
} from '../types';

const initialState = {
  orders: [],
  total: 0,
  loading: true,
  order: null
};

export default function orders(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_ORDERS:
      return {
        ...state,
        orders: payload.orders,
        loading: false,
        total: payload.total
      }
    default:
      return state;
  }
}
