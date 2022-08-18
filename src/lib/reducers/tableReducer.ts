import { AnyAction } from "@reduxjs/toolkit";
import { CryptFromFetch } from "../../types";

const ADD_DATA_TO_TABLE = "ADD_DATA_TO_TABLE";

let initialState: Array<CryptFromFetch> = [];

export const tableReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_DATA_TO_TABLE: {
      return action.payload.data;
    }
    default:
      return state;
  }
};
