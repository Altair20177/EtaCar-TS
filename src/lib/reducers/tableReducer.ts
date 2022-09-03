import { CryptFromFetch } from "../../types";
import { TableAction, TableActionTypes } from "../actions/tableActions";

let initialState: Array<CryptFromFetch> = [];

export const tableReducer = (
  state = initialState,
  action: TableAction
): Array<CryptFromFetch> => {
  switch (action.type) {
    case TableActionTypes.ADD_DATA_TO_TABLE: {
      return action.payload;
    }
    default:
      return state;
  }
};
