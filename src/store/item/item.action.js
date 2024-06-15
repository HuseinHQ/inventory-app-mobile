import axios from 'axios';
import { BACKEND_URL } from '../../../env';
import actionType from '../action.type';

const fetchLoading = () => {
  return {
    type: actionType.ITEMS_LOADING,
  };
};

const fetchItemsSuccess = items => {
  return {
    type: actionType.GET_ITEMS_SUCCESS,
    payload: items,
  };
};

const fetchCategoriesSuccess = categories => {
  return {
    type: actionType.GET_CATEGORIES_SUCCESS,
    payload: categories,
  };
};

const fetchFailure = error => {
  return {
    type: actionType.ITEMS_ERROR,
    payload: error,
  };
};

const clearError = () => {
  return {
    type: actionType.CLEAR_ITEMS_ERROR,
  };
};

export const getItems = access_token => async dispatch => {
  dispatch(fetchLoading());
  try {
    const { data } = await axios.get(`${BACKEND_URL}/items`, {
      headers: { access_token },
    });
    dispatch(fetchItemsSuccess(data.data));
  } catch (error) {
    console.log('-----Error on getItems-----', error.response?.data?.message);
    dispatch(fetchFailure(error?.response?.data?.message || 'Error'));
  } finally {
    dispatch(fetchLoading());
    setTimeout(() => {
      dispatch(clearError());
    }, 4000);
  }
};

export const getCategories = access_token => async dispatch => {
  try {
    dispatch(fetchLoading());
    const { data } = await axios.get(`${BACKEND_URL}/categories`, {
      headers: { access_token },
    });
    dispatch(fetchCategoriesSuccess(data.data));
  } catch (error) {
    console.log(error?.response?.data?.message);
    dispatch(fetchFailure(error?.response?.data?.message));
  } finally {
    dispatch(fetchLoading());
    setTimeout(() => {
      dispatch(clearError());
    }, 4000);
  }
};
