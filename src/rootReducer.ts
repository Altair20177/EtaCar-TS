import { combineReducers } from "redux";
import { cryptAboutReducer } from "./lib/reducers/cryptAboutReducer";
import { tableReducer } from "./lib/reducers/tableReducer";
import { walletReducer } from "./lib/reducers/walletReducer";

export const rootReducer = combineReducers({
  mainPage: tableReducer,
  cryptPage: cryptAboutReducer,
  walletPage: walletReducer,
});

export type RootState = ReturnType<typeof rootReducer>;