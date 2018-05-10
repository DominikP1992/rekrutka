import types from '../types';

const defaultState = {
  selectedColor: '',
  colors: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_COLORS_SUCCESS:
      return ({
        ...state,
        colors: action.payload.data,
      });
    case types.CHANGE_BACKGROUND_COLOR: return ({
      ...state,
      selectedColor: action.payload,
    });
    default:
      return state;
  }
};
