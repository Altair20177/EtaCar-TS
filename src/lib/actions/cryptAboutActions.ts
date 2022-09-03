import { DataAboutCrypt } from "../../types";

export enum CryptAboutActionTypes {
  ADD_DATA_TO_CRYPT_ABOUT = "ADD_DATA_TO_CRYPT_ABOUT",
}

export interface CryptAboutAction {
  type: CryptAboutActionTypes.ADD_DATA_TO_CRYPT_ABOUT;
  payload: DataAboutCrypt;
}

export const addDataAboutCrypt = (data: DataAboutCrypt): CryptAboutAction => ({
  type: CryptAboutActionTypes.ADD_DATA_TO_CRYPT_ABOUT,
  payload: data,
});
