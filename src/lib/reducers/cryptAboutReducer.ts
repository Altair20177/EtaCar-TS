import { DataAboutCrypt } from "../../types";
import {
  CryptAboutAction,
  CryptAboutActionTypes,
} from "../actions/cryptAboutActions";

let initialState: DataAboutCrypt = {
  about: {
    changePercent24Hr: "",
    id: "",
    name: "",
    priceUsd: "",
    rank: "",
    symbol: "",
    supply: "",
    marketCapUsd: "",
  },
  rates: {
    currencySymbol: "",
    id: "",
    rateUsd: "",
    symbol: "",
    type: "",
  },
  markets: [],
  historyPerDay: [],
};

export const cryptAboutReducer = (
  state = initialState,
  action: CryptAboutAction
): DataAboutCrypt => {
  switch (action.type) {
    case CryptAboutActionTypes.ADD_DATA_TO_CRYPT_ABOUT: {
      return action.payload;
    }
    default:
      return state;
  }
};
