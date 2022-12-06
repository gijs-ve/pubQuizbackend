import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./Room/slice";

const store = configureStore({
  reducer: {
    room: roomReducer,
  },
});

export default store;
