export const addCryptToWallet = (data: any) => ({
  type: "ADD_CRYPT_TO_WALLET",
  payload: { data },
});

export const deleteCryptFromWallet = (data: any) => ({
  type: "DELETE_CRYPT_FROM_WALLET",
  payload: { data },
});
