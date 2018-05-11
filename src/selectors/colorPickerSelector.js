import { createSelector } from 'reselect';
// simple selector

export const colorsSelector = createSelector(
  state => state.colorPicker.colors,
  colors => colors,
);
