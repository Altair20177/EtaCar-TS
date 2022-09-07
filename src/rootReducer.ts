import { combineReducers } from "redux";
import { walletReducer } from "./lib/reducers/walletReducer";

export const rootReducer = combineReducers({
  walletPage: walletReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
