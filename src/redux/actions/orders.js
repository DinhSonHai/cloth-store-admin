import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_ALL_ORDERS } from '../types';

// Action creator
export const getAllOrdersForAdmin = (sort, page, limit) => async (dispatch) => {
  let limitNumber = 10;
  if (limit) {
    limitNumber = parseInt(limit);
  }
  try {
    let queryParams = `?limit=${limitNumber}`;
    if (sort) {
      if (page) {
        queryParams = `?sort=${sort}&page=${page}&limit=${limitNumber}`;
      }
      else {
        queryParams = `?sort=${sort}&limit=${limitNumber}`;
      }
    }
    else {
      if (page) {
        queryParams = `?page=${page}&limit=${limitNumber}`
      }
    }
    const res = await axios.get(`/api/orders/admin/${queryParams}`);
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
  let limitNumber = 10;
  if (limit) {
    limitNumber = parseInt(limit);
  }
  try {
    let queryParams = `&limit=${limitNumber}`;
    if (sort) {
      if (page) {
        queryParams = `&sort=${sort}&page=${page}&limit=${limitNumber}`;
      }
      else {
        queryParams = `&sort=${sort}&limit=${limitNumber}`;
      }
    }
    else {
      if (page) {
        queryParams = `&page=${page}&limit=${limitNumber}`
      }
    }
    const res = await axios.get(`/api/orders/admin?q=${q}${queryParams}`);
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

export const completeOrder = (orderId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/orders/admin/${orderId}/complete`);
    dispatch(getAllOrdersForAdmin());
    toast.success(res.data.message);
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}

export const cancelOrder = (orderId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/orders/admin/${orderId}/cancel`);
    dispatch(getAllOrdersForAdmin());
    toast.success(res.data.message);
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}
