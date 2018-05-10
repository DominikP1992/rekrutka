import { combineReducers } from 'redux';

// parts of state
import colorPicker from './colorPickerReducer';

// combine all reducers
const rootReducer = combineReducers({
  colorPicker,
});

export default rootReducer;
