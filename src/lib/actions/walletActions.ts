import { Crypt } from "../../types";

export enum WalletActionTypes {
  ADD_CRYPT_TO_WALLET = "ADD_CRYPT_TO_WALLET",
  DELETE_CRYPT_FROM_WALLET = "DELETE_CRYPT_FROM_WALLET",
}

interface AddCryptAction {
  type: WalletActionTypes.ADD_CRYPT_TO_WALLET;
  payload: Crypt;
}

interface DeleteCryptAction {
  type: WalletActionTypes.DELETE_CRYPT_FROM_WALLET;
  payload: Crypt;
}

export type WalletAction = AddCryptAction | DeleteCryptAction;

export const addCryptToWallet = (data: Crypt): AddCryptAction => ({
  type: WalletActionTypes.ADD_CRYPT_TO_WALLET,
  payload: data,
});

export const deleteCryptFromWallet = (data: Crypt): DeleteCryptAction => ({
  type: WalletActionTypes.DELETE_CRYPT_FROM_WALLET,
  payload: data,
});
