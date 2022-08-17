import { Crypt } from "../../types";

const ADD_CRYPT_TO_WALLET = "ADD_CRYPT_TO_WALLET";
const DELETE_CRYPT_FROM_WALLET = "DELETE_CRYPT_FROM_WALLET";

let initialState: Array<Crypt> = [];

export const walletReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_CRYPT_TO_WALLET: {
      const same = state.filter((item) => item.id === action.payload.data.id);

      if (same.length) {
        const newState = [...state];
        const itemIndex = newState.indexOf(same[0]);
        const newItem = { ...newState[itemIndex] };
        newItem.amount += action.payload.data.amount;
        newState[itemIndex] = newItem;

        return [...newState];
      } else return [...state, action.payload.data];
    }
    case DELETE_CRYPT_FROM_WALLET: {
      const workItem = state.find((item) => item.id === action.payload.data.id);

      if (workItem && workItem.amount <= action.payload.data.amountToDelete) {
        return [...state.filter((item) => item.id !== action.payload.data.id)];
      } else if (workItem) {
        let itemIndex = 0;

        const newState = [...state];
        newState.forEach((item, index) => {
          if (item.id === workItem.id) itemIndex = index;
        });
        const newItem = { ...newState[itemIndex] };
        newItem.amount -= action.payload.data.amountToDelete;
        newState[itemIndex] = newItem;

        return [...newState];
      }
      break;
    }
    default:
      return state;
  }
};
