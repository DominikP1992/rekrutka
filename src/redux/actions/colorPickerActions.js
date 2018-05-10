import axios from 'axios';

import types from '../types';


const URL =
'http://www.mocky.io/v2/5a37a7403200000f10eb6a2d';

function fetchColorsRequest() {
  return {
    type: types.FETCH_COLORS_REQUEST,
  };
}

function fetchColorsSuccess(fetchedData) {
  return {
    type: types.FETCH_COLORS_SUCCESS,
    payload: { data: fetchedData },
  };
}

function fetchColorsFailure() {
  return {
    type: types.FETCH_COLORS_FAILURE,
  };
}

export function fetchColors() {
  return (dispatch) => {
    dispatch(fetchColorsRequest());
    return axios.get(`${URL}`).then((res) => {
      if (res.status === 200) {
        return dispatch(fetchColorsSuccess(res.data));
      }
      dispatch(fetchColorsFailure());
      return false;
    });
  };
}

export function updateColor(selectedColor) {
  return {
    type: types.CHANGE_BACKGROUND_COLOR,
    payload: selectedColor,
  };
}
