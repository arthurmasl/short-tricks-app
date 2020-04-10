import { createSlice, createSelector } from '@reduxjs/toolkit';

const creatorSlice = createSlice({
  name: 'creator',
  initialState: {
    isLoading: false,
    form: {
      category: '',
      name: '',
      originalVideo: ''
    }
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setForm(state, action) {
      const { name, value } = action.payload;

      state.form[name] = value;
    }
  }
});

export const selectIsLoading = state => state.creator.isLoading;
export const selectForm = state => state.creator.form;

export const selectFormItem = name =>
  createSelector(selectForm, form => form[name]);

export const { setIsLoading, setForm } = creatorSlice.actions;
export default creatorSlice.reducer;
