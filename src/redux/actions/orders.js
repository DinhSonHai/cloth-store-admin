import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_ALL_ORDERS } from '../types';

// Action creator
export const getAllOrdersForAdmin = (sort, page, limit, value) => async (dispatch) => {
  let queryParams = `?sort=${sort}&page=${page}&limit=${limit}`;

  if (value && Date.parse(value[0]) !== Date.parse(value[1])) {
    queryParams = `?from=${Date.parse(value[0])}&to=${Date.parse(value[1])}&page=${page}&limit=${limit}`;
  }

  try {
    const res = await axios.get(`/api/orders/admin${queryParams}`);
    dispatch({
      type: GET_ALL_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}

// Action creator
export const getSearchAllOrdersForAdmin = (q, sort, page, limit, value) => async (dispatch) => {
  let queryParams = `?sort=${sort}&page=${page}&limit=${limit}`;

  if (q) {
    queryParams = `?q=${q}&sort=${sort}&page=${page}&limit=${limit}`;

    if (value && Date.parse(value[0]) !== Date.parse(value[1])) {
      queryParams = `?q=${q}&from=${Date.parse(value[0])}&to=${Date.parse(value[1])}&page=${page}&limit=${limit}`;
    }
  }

  try {
    const res = await axios.get(`/api/orders/admin${queryParams}`);
    dispatch({
      type: GET_ALL_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}

export const completeOrder = (orderId, q, sort, page, limit, value) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/orders/admin/${orderId}/complete`);
    if (q) {
      dispatch(getSearchAllOrdersForAdmin(q, sort, page, limit, value));
    }
    else {
      dispatch(getAllOrdersForAdmin(sort, page, limit, value));
    }
    toast.success(res.data.message);
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}

export const cancelOrder = (orderId, q, sort, page, limit, value) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/orders/admin/${orderId}/cancel`);
    if (q) {
      dispatch(getSearchAllOrdersForAdmin(q, sort, page, limit, value));
    }
    else {
      dispatch(getAllOrdersForAdmin(sort, page, limit, value));
    }
    toast.success(res.data.message);
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}
