import { createSlice, createSelector } from '@reduxjs/toolkit';

const interfaceSlice = createSlice({
  name: 'interface',
  initialState: {
    menu: false,
    user: null,
    filterStates: ['see all', 'liked'],
    filterState: 0,
  },
  reducers: {
    setMenu(state, action) {
      if (!action.payload) {
        state.menu = !state.menu;
      } else {
        state.menu = action.payload;
      }
    },

    setUser(state, action) {
      state.user = action.payload;
    },

    setFilter(state, action) {
      state.filterState = action.payload;
    },

    toggleFilter(state) {
      if (state.filterState < state.filterStates.length - 1) {
        state.filterState++;
      } else {
        state.filterState = 0;
      }
    },
  },
});

export const selectMenu = (state) => state.interface.menu;
export const selectUser = (state) => state.interface.user;

const selectFilterState = (state) => state.interface.filterState;
const selectFilterStates = (state) => state.interface.filterStates;

export const selectFilter = createSelector(
  [selectFilterState, selectFilterStates],
  (filterState, filterStates) => filterStates[filterState]
);

export const {
  setMenu,
  setUser,
  toggleFilter,
  setFilter,
} = interfaceSlice.actions;
export default interfaceSlice.reducer;
