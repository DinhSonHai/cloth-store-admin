import axios from 'axios';
import {
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOG_OUT
} from '../types';
import { toast } from 'react-toastify';
import setAuthToken from '../../utils/setAuthToken';

// Load Admin
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/auth/admin');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Admin Login
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth/admin/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    return true;
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: { type: 'login', message: error.message }
      });
    }
  }
}

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
};
