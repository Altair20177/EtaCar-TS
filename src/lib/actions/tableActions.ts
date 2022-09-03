import { CryptFromFetch } from "../../types";

export enum TableActionTypes {
  ADD_DATA_TO_TABLE = "ADD_DATA_TO_TABLE",
}

export interface TableAction {
  type: TableActionTypes.ADD_DATA_TO_TABLE;
  payload: Array<CryptFromFetch>;
}

export const addDataToTableAction = (
  data: Array<CryptFromFetch>
): TableAction => ({
  type: TableActionTypes.ADD_DATA_TO_TABLE,
  payload: data,
});
