import { DataAboutCrypt } from "../../types";

export const addDataAboutCrypt = (data: DataAboutCrypt) => ({
  type: "ADD_DATA_TO_CRYPT_ABOUT",
  payload: { data },
});
