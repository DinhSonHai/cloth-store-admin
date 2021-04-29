import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_ALL_ORDERS } from '../types';

// Action creator
export const getAllOrdersForAdmin = (sort, page, limit) => async (dispatch) => {
  let queryParams = `?sort=${sort}&page=${page}&limit=${limit}`;

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
export const getSearchAllOrdersForAdmin = (q, sort, page, limit) => async (dispatch) => {
  let queryParams = `?sort=${sort}&page=${page}&limit=${limit}`;

  if (q) {
    queryParams = `?q=${q}&sort=${sort}&page=${page}&limit=${limit}`;
  }

  try {
    const res = await axios.get(`/api/oders/admin${queryParams}`);
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

export const completeOrder = (orderId, sort, page, limit) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/orders/admin/${orderId}/complete`);
    dispatch(getAllOrdersForAdmin(sort, page, limit));
    toast.success(res.data.message);
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}

export const cancelOrder = (orderId, sort, page, limit) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/orders/admin/${orderId}/cancel`);
    dispatch(getAllOrdersForAdmin(sort, page, limit));
    toast.success(res.data.message);
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}
