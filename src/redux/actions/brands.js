import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_ALL_BRANDS } from '../types';

// Action creator
export const getAllBrands = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/brands');
    dispatch({
      type: GET_ALL_BRANDS,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}
