export const addCryptToWallet = (data) => ({
  type: "ADD_CRYPT_TO_WALLET",
  payload: { data },
});

export const deleteCryptFromWallet = (data) => ({
  type: "DELETE_CRYPT_FROM_WALLET",
  payload: { data },
});
