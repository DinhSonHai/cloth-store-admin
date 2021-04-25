import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_ALL_CATEGORIES } from '../types';

// Action creator
export const getAllCategories = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/categories');
    dispatch({
      type: GET_ALL_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}
