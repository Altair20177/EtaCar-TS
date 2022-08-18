import { configureStore } from "@reduxjs/toolkit";
import { cryptAboutReducer } from "./reducers/cryptAboutReducer";
import { tableReducer } from "./reducers/tableReducer";
import { walletReducer } from "./reducers/walletReducer";

export const store = configureStore({
  reducer: {
    mainPage: tableReducer,
    cryptPage: cryptAboutReducer,
    walletPage: walletReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch