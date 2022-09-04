import Modal from "../../generic/Modal";
import { useState } from "react";
import { deleteCryptFromWallet } from "../../../lib/actions/walletActions";
import WalletModalLayout from "./WalletModalLayout";
import checkInputSymbol from "../../generic/checkInputSymbol";
import { Crypt } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../hooks";

export interface WalletModalProps {
  isWalletOpen: boolean;
  setIsWalletOpen: (flag: boolean) => void;
}

export default function WalletModal({
  isWalletOpen,
  setIsWalletOpen,
}: WalletModalProps) {
  const walletData = useAppSelector((state) => state.walletPage);
  const dispatch = useAppDispatch();

  const [requestToDelete, setRequestToDelete] = useState<boolean>(false);
  const [deleteAmount, setDeleteAmount] = useState<string>("");
  const [cryptToDelete, setCryptToDelete] = useState<Crypt>(walletData[0]);
  const [error, setError] = useState<boolean>(false);

  function deleteCryptRequest(index: number) {
    setRequestToDelete(true);
    const arrCrypt: Array<Crypt> = walletData.slice(index, index + 1);
    setCryptToDelete(arrCrypt[0]);
  }

  function deleteCrypt() {
    setError(deleteAmount === "" ? true : false);

    let indexToDelete = null;

    if (!error && deleteAmount !== "") {
      const obj = {
        ...cryptToDelete,
        amountToDelete: +deleteAmount,
      };

      dispatch(deleteCryptFromWallet(obj));
      setDeleteAmount("");

      const correctWallet = JSON.parse(String(localStorage.getItem("wallet")));
      cryptToDelete &&
        correctWallet.forEach((item: Crypt, index: number) => {
          if (item.id === cryptToDelete.id) {
            if (Number(deleteAmount) >= item.amount) indexToDelete = index;
            else item.amount -= Number(deleteAmount);

            item.amount = +item.amount.toFixed(5);
          }
        });

      if (indexToDelete !== null) {
        correctWallet.splice(indexToDelete, 1);
        setRequestToDelete(false);
      }
      localStorage.setItem("wallet", JSON.stringify(correctWallet));

      obj.amount -= +deleteAmount;
      setCryptToDelete(obj);
    }
  }

  function closePopup() {
    setIsWalletOpen(false);
    setRequestToDelete(false);
    setDeleteAmount("");
    setError(false);
  }

  function onChange(
    e: React.ChangeEvent<HTMLInputElement>,
    cryptToDelete: Crypt
  ) {
    if (
      !checkInputSymbol(e.target.value) ||
      cryptToDelete.amount < +e.target.value
    ) {
      return null;
    }

    setDeleteAmount(e.target.value);
    setError(e.target.value === "" ? true : false);
  }

  return (
    <Modal setIsPopupOpen={closePopup} isPopupOpen={isWalletOpen}>
      <WalletModalLayout
        walletData={walletData}
        closePopup={closePopup}
        onChange={onChange}
        error={error}
        deleteCrypt={deleteCrypt}
        deleteCryptRequest={deleteCryptRequest}
        requestToDelete={requestToDelete}
        deleteAmount={deleteAmount}
        cryptToDelete={cryptToDelete}
      />
    </Modal>
  );
}
