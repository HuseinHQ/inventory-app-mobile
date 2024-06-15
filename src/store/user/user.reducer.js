import actionType from '../action.type';

const initialState = {
  accessToken: '',
  loading: false,
  error: '',
  name: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USER_LOADING:
      return { ...state, loading: !state.loading };
    case actionType.USER_ERROR:
      return { ...state, error: action.payload };
    case actionType.CLEAR_USER_ERROR:
      return { ...state, error: '' };
    case actionType.LOGIN_SUCCESS:
      return { ...state, accessToken: action.payload };
    case actionType.LOGOUT:
      return { ...state, accessToken: '' };
    case actionType.GET_USER_SUCCESS:
      return { ...state, name: action.payload.name };
    default:
      return state;
  }
};

export default userReducer;
