import axios from 'axios';
import { BACKEND_URL } from '../../../env';
import actionType from '../action.type';
import ImageCropPicker from 'react-native-image-crop-picker';
import fs from 'react-native-fs';

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

const deleteItemSuccess = id => {
  return {
    type: actionType.DELETE_ITEM_SUCCESS,
    payload: id,
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
    dispatch(clearError());
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
    dispatch(clearError());
  }
};

export const deleteItem =
  (id, access_token, errorCallback = () => {}) =>
  async dispatch => {
    try {
      await axios.delete(`${BACKEND_URL}/items/${id}`, {
        headers: {
          access_token,
        },
        timeout: 5000,
      });
      // dispatch(deleteItemSuccess(id));
      dispatch(getItems(access_token));
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        console.log('Request timed out');
        dispatch(fetchFailure('Request timed out'));
        errorCallback('Request timed out');
      } else {
        console.log(error?.response?.data?.message);
        dispatch(fetchFailure(error?.response?.data?.message));
        errorCallback(error?.response?.data?.message);
      }
    } finally {
      dispatch(clearError());
    }
  };

export const postItem =
  (
    { form, access_token },
    { successCallback = () => {}, errorCallback = () => {} },
  ) =>
  async dispatch => {
    try {
      const { data } = await axios.post(`${BACKEND_URL}/items`, form, {
        headers: {
          'Content-Type': 'application/json',
          access_token: access_token,
        },
      });

      dispatch(getItems(access_token));
      successCallback(data.message.id);
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(fetchFailure(error.response.data.message));
      errorCallback(error.response.data.message);
    } finally {
      dispatch(clearError());
    }
  };

export const putImage = (id, access_token) => async dispatch => {
  try {
    const image = await ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    });

    const formData = new FormData();
    formData.append('image', {
      uri: image.path, // or image.uri depending on the library's response
      type: image.mime, // MIME type of the image, e.g., 'image/jpeg'
      name: image.path.split('/').pop(), // Extracts file name
    });

    const { data } = await axios.post(
      `${BACKEND_URL}/items/${id}/image`,
      formData,
      {
        headers: {
          access_token,
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    dispatch(getItems(access_token));
  } catch (error) {
    if (error.name === 'Error') {
      console.log(error?.message);
      dispatch(fetchFailure(error?.message));
    } else {
      console.log(error?.response?.data?.message);
      dispatch(fetchFailure(error?.response?.data?.message));
    }
  } finally {
    dispatch(clearError());
  }
};

export const putItem =
  (
    { id, form, access_token },
    { successCallback = () => {}, errorCallback = () => {} },
  ) =>
  async dispatch => {
    try {
      const { data } = await axios.put(`${BACKEND_URL}/items/${id}`, form, {
        headers: {
          'Content-Type': 'application/json',
          access_token,
        },
      });

      dispatch(getItems(access_token));
      successCallback(data.message.id);
    } catch (error) {
      console.log(error?.response?.data?.message);
      dispatch(fetchFailure(error?.response?.data?.message));
      errorCallback(error?.response?.data?.message);
    } finally {
      dispatch(clearError());
    }
  };
