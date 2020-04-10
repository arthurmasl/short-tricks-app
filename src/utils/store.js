import { configureStore } from '@reduxjs/toolkit';
import playerSlice from '../slices/playerSlice';
import creatorSlice from '../slices/creatorSlice';
import storeSlice from '../slices/storeSlice';
import interfaceSlice from '../slices/interfaceSlice';

const store = configureStore({
  reducer: {
    player: playerSlice,
    creator: creatorSlice,
    store: storeSlice,
    interface: interfaceSlice
  }
});

export default store;
