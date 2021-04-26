import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_ALL_PRODUCTS, ADD_PRODUCT_SUCCESS, GET_PRODUCT_BY_ID } from '../types';

// Action creator
export const getAllProductsForAdmin = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/products/admin');
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}

export const getProductById = (productId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/${productId}`);
    dispatch({
      type: GET_PRODUCT_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}

export const addProduct = async (formData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);
  try {
    const res = await axios.post('/api/products', body, config);
    // dispatch({
    //   type: ADD_PRODUCT_SUCCESS,
    //   payload: res.data,
    // });
    toast.success(res.data.message);
    return true;
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}

export const editProduct = (formData, productId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);
  try {
    const res = await axios.put(`/api/products/${productId}`, body, config);
    dispatch(getProductById(productId));
    toast.success(res.data.message);
    return true;
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}

export const removeProduct = (productId) => async (dispatch) => {
  try {
    await axios.delete(`/api/products/${productId}`);
    dispatch(getAllProductsForAdmin());
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}