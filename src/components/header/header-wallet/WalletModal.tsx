import Modal from "../../generic/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteCryptFromWallet } from "../../../lib/actions/walletActions";
import WalletModalLayout from "./WalletModalLayout";
import checkInputSymbol from "../../generic/checkInputSymbol";
import { Crypt } from "../../../types";

export interface WalletModalProps {
  isWalletOpen: boolean;
  setIsWalletOpen: (flag: boolean) => void;
}

export default function WalletModal({
  isWalletOpen,
  setIsWalletOpen,
}: WalletModalProps) {
  const walletData = useSelector((state: any) => state.walletPage);
  const dispatch = useDispatch();

  const [requestToDelete, setRequestToDelete] = useState(false);
  const [deleteAmount, setDeleteAmount] = useState("");
  const [cryptToDelete, setCryptToDelete] = useState<null | Crypt>(null);
  const [error, setError] = useState(false);

  function deleteCryptRequest(crypt: Crypt) {
    setRequestToDelete(true);
    setCryptToDelete(crypt);
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
    }
  }

  function closePopup() {
    setIsWalletOpen(false);
    setRequestToDelete(false);
    setDeleteAmount("");
    setError(false);
  }

  function onChange(e: any) {
    if (!checkInputSymbol(e.target.value)) {
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
