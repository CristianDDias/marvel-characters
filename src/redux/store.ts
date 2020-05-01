import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

import characterReducer from "./characters/slice";
import serieReducer from "./series/slice";

const store = configureStore({
  reducer: {
    character: characterReducer,
    serie: serieReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>;

export default store;
