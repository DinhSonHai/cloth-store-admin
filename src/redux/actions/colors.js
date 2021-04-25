import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_ALL_COLORS } from '../types';

// Action creator
export const getAllColors = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/colors');
    dispatch({
      type: GET_ALL_COLORS,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}
