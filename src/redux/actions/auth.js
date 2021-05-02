import axios from 'axios';
import {
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  UPDATE_PROFILE_ERRORS,
  LOG_OUT
} from '../types';
import { toast } from 'react-toastify';

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

// Change info
export const changeInfo = ({ name }, setEdit) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name });
  try {
    const res = await axios.put('/api/auth/admin/info', body, config);
    dispatch(loadUser());
    setEdit(false);
    toast.success(res.data.message, { position: toast.POSITION.TOP_CENTER });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch({
        type: UPDATE_PROFILE_ERRORS,
        payload: { type: 'changeInfo', message: error.message }
      });
    }
  }
}

// Change password
export const changePassword = ({ currentPassword, newPassword }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ currentPassword, newPassword });
  try {
    const res = await axios.put('/api/auth/admin/password', body, config);
    dispatch(loadUser());
    toast.success(res.data.message, { position: toast.POSITION.TOP_CENTER });
    return true;
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch({
        type: UPDATE_PROFILE_ERRORS,
        payload: { type: 'changePassword', message: error.message }
      });
    }
  }
}

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
};
