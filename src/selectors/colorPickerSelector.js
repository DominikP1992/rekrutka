import { createSelector } from 'reselect';
// simple selector

export const getFilteredColors = createSelector(
  state => state.colorPicker.colors,
  (data) => { console.log(data); return []; },
);
