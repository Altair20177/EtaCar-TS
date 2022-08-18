import { CryptFromFetch } from "../../types";

export const addDataToTableAction = (data: Array<CryptFromFetch>) => ({
  type: "ADD_DATA_TO_TABLE",
  payload: { data },
});
