import { Crypt } from "../../types";

export const addCryptToWallet = (data: Crypt) => ({
  type: "ADD_CRYPT_TO_WALLET",
  payload: { data },
});

export const deleteCryptFromWallet = (data: Crypt) => ({
  type: "DELETE_CRYPT_FROM_WALLET",
  payload: { data },
});
