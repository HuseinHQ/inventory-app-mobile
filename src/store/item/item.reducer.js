import moment from 'moment';
import actionType from '../action.type';

const initialState = {
  loading: false,
  items: [],
  categories: [],
  error: '',
  dashboard: {
    itemKind: 0,
    totalCategory: 0,
    allItemCount: 0,
    incomingGoodsToday: 0,
  },
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionType.GET_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        dashboard: {
          ...state.dashboard,
          itemKind: action.payload.length,
          allItemCount: action.payload.reduce(
            (prev, cur) => prev + cur.quantity,
            0,
          ),
          incomingGoodsToday: action.payload.reduce(
            (currentValue, item) =>
              currentValue +
              (moment(item.createdAt).format('YYYY-MM-DD') ===
              moment().format('YYYY-MM-DD')
                ? 1
                : 0),
            0,
          ),
        },
      };
    case actionType.ITEMS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case actionType.CLEAR_ITEMS_ERROR:
      return {
        ...state,
        error: '',
      };
    case actionType.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        dashboard: {
          ...state.dashboard,
          totalCategory: action.payload.length,
        },
      };
    default:
      return state;
  }
};

export default itemReducer;
