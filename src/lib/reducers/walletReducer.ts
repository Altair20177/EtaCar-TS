import { Crypt } from "../../types";
import { WalletAction, WalletActionTypes } from "../actions/walletActions";

let initialState: Array<Crypt> = [];

export const walletReducer = (
  state = initialState,
  action: WalletAction
): Array<Crypt> => {
  switch (action.type) {
    case WalletActionTypes.ADD_CRYPT_TO_WALLET: {
      const same = state.filter((item) => item.id === action.payload.id);

      if (same.length) {
        const newState = [...state];
        const itemIndex = newState.indexOf(same[0]);
        const newItem = { ...newState[itemIndex] };
        newItem.amount += action.payload.amount;
        newState[itemIndex] = newItem;

        return [...newState];
      } else return [...state, action.payload];
    }
    case WalletActionTypes.DELETE_CRYPT_FROM_WALLET: {
      let workItem =
        state.find((item) => item.id === action.payload.id) || action.payload;

      if (
        workItem &&
        action.payload.amountToDelete &&
        workItem.amount <= action.payload.amountToDelete
      ) {
        return [...state.filter((item) => item.id !== action.payload.id)];
      } else {
        let itemIndex = 0;

        const newState = [...state];
        newState.forEach((item, index) => {
          if (item.id === workItem.id) itemIndex = index;
        });
        const newItem = { ...newState[itemIndex] };
        if (action.payload.amountToDelete)
          newItem.amount -= action.payload.amountToDelete;
        newState[itemIndex] = newItem;

        return [...newState];
      }
    }
    default:
      return state;
  }
};
