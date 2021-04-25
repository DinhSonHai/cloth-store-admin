import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_ALL_SIZES } from '../types';

// Action creator
export const getAllSizes = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/sizes');
    dispatch({
      type: GET_ALL_SIZES,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}
