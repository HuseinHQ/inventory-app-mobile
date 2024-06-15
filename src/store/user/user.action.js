import axios from 'axios';
import { BACKEND_URL } from '../../../env';
import actionType from '../action.type';

const userLoading = () => {
  return {
    type: actionType.USER_LOADING,
  };
};

const clearError = () => {
  return {
    type: actionType.CLEAR_USER_ERROR,
  };
};

const loginSuccess = accessToken => {
  return {
    type: actionType.LOGIN_SUCCESS,
    payload: accessToken,
  };
};

const userError = error => {
  return {
    type: actionType.USER_ERROR,
    payload: error,
  };
};

const getUserSuccess = payload => {
  return {
    type: actionType.GET_USER_SUCCESS,
    payload,
  };
};

// Functions
export const login = form => async dispatch => {
  try {
    dispatch(userLoading());

    const { data } = await axios.post(`${BACKEND_URL}/login`, form, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    });
    dispatch(loginSuccess(data.access_token));
    dispatch(userLoading());
  } catch (error) {
    dispatch(userLoading());
    dispatch(userError(error?.response?.data?.message || 'Error'));
    setTimeout(() => {
      dispatch(clearError());
    }, 4000);
  }
};

export const register =
  (form, { successCallback = () => {}, errorCallback = () => {} }) =>
  async dispatch => {
    try {
      dispatch(userLoading());
      await axios.post(`${BACKEND_URL}/register`, form, {
        headers: { 'Content-Type': 'application/json' },
      });
      successCallback();
    } catch (error) {
      console.log(error?.response?.data?.message);
      dispatch(userError(error?.response?.data?.message || 'Error'));
      errorCallback();
    } finally {
      dispatch(userLoading());
    }
  };

export const logout =
  (callback = () => {}) =>
  dispatch => {
    dispatch({
      type: actionType.LOGOUT,
    });
    callback();
  };

export const getUser = access_token => async dispatch => {
  try {
    dispatch(userLoading());
    const { data } = await axios.get(`${BACKEND_URL}/user`, {
      headers: { access_token },
    });
    dispatch(getUserSuccess(data.data));
  } catch (error) {
    console.log(error?.response?.data?.message);
    dispatch(userError(error?.response?.data?.message || 'Error'));
  } finally {
    dispatch(userLoading());
    setTimeout(() => {
      dispatch(clearError());
    }, 4000);
  }
};
