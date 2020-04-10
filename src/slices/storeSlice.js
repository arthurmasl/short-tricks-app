import { createSlice, createSelector } from '@reduxjs/toolkit';
import { selectUser, selectFilter } from './interfaceSlice';

const storeSlice = createSlice({
  name: 'stroe',
  initialState: {
    categories: [],
    category: {},
    items: [],
    item: {},
    createLoading: false,
  },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },

    setItem(state, action) {
      state.item = action.payload;
    },

    setItems(state, action) {
      state.items = action.payload;
    },

    setCategory(state, action) {
      state.category = action.payload;
    },
    setCreateLoading(state, action) {
      state.createLoading = action.payload;
    },
  },
});

export const selectCategories = (state) => state.store.categories;
export const selectItems = (state) => state.store.items;
export const selectItem = (state) => state.store.item;
export const selectCategory = (state) => state.store.category;
export const selectCreateLoading = (state) => state.store.createLoading;

export const selectCurrentCategory = (name) =>
  createSelector([selectCategories, selectCategory], (categories, category) => {
    if (category && category.name === name) {
      return category;
    } else {
      return categories.find((cat) => cat.name === name) || {};
    }
  });

export const selectFilteredCategories = createSelector(
  [selectFilter, selectUser, selectCategories],
  (filter, user, categories) => {
    if (filter === 'liked') {
      if (!user) return categories;

      const likedCategories = [];

      categories.forEach((category) => {
        const likedItems = [];
        category.items.forEach((i) => {
          if (user.likes.includes(i.id)) {
            likedItems.push(i);
          }
        });

        if (likedItems.length) {
          likedCategories.push({ ...category, items: likedItems });
        }
      });

      return likedCategories;
    } else {
      return categories;
    }
  }
);

export const selectFilteredItems = createSelector(
  [selectFilter, selectUser, selectItems],
  (filter, user, items) => {
    if (filter === 'liked') {
      if (!user) return items;

      const likedItems = [];

      items.forEach((item) => {
        if (user.likes.includes(item._id)) {
          likedItems.push(item);
        }
      });

      return likedItems;
    } else {
      return items;
    }
  }
);

export const selectCategoryLikes = createSelector([selectItems], (items) => {
  let likes = 0;

  items.forEach((item) => {
    likes += item.likes;
  });

  return likes;
});

export const {
  setCategories,
  setItem,
  setItems,
  setCategory,
  setCreateLoading,
} = storeSlice.actions;
export default storeSlice.reducer;
