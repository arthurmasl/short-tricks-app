import { createSelector } from '@reduxjs/toolkit';
import { selectCategories } from '../slices/storeSlice';

export const selectOptions = createSelector(selectCategories, categories => {
  let options = [];

  categories.forEach(c => {
    options.push({ label: c.name });
    c.items.forEach(ci => options.push({ label: `${c.name}/${ci.name}` }));
  });

  return options;
});

export const selectCategiriesOptions = createSelector(
  selectCategories,
  categories => categories.map(c => ({ label: c.name }))
);

export const selectItemsOptions = createSelector(
  selectCategories,
  categories => {
    let options = [];

    categories.forEach(c => {
      c.items.forEach(ci => options.push({ label: ci.name }));
    });

    return options;
  }
);
