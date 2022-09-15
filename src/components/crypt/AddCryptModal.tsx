import "../generic/cryptModal.scss";

import cross from "../generic/icons/cross.svg";
import React, { useState } from "react";
import Modal from "../generic/Modal";
import { addCryptToWallet } from "../../lib/actions/walletActions";
import checkInputSymbol from "../generic/checkInputSymbol";
import { ButtonSizes, ButtonTypes, Crypt, CryptFromFetch } from "../../types";
import { useAppDispatch } from "../../hooks";
import Button from "../generic/button/Button";

export interface AddCryptModalProps {
  isPopupOpen: boolean;
  setIsPopupOpen: (flag: boolean) => void;
  cryptAbout: CryptFromFetch;
}

export default function AddCryptModal({
  isPopupOpen,
  setIsPopupOpen,
  cryptAbout,
}: AddCryptModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [error, setErorr] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  function closePopup() {
    setIsPopupOpen(false);
    setErorr(false);
    setAmount("");
  }

  function onSubmit(e: React.MouseEvent) {
    e.preventDefault();

    let isItemUnique: boolean = true;

    const { id, name, priceUsd, changePercent24Hr, symbol } = cryptAbout;
    const obj = {
      id,
      name,
      symbol,
      price: priceUsd,
      amount: +amount,
      change: changePercent24Hr,
    };

    if (+amount !== 0 && amount) {
      dispatch(addCryptToWallet(obj));

      const walletGet = localStorage.getItem("wallet");

      if (walletGet) {
        const correctWallet = JSON.parse(walletGet);

        correctWallet.forEach((item: Crypt) => {
          if (item.id === obj.id) {
            item.amount += obj.amount;
            isItemUnique = false;
          }
        });

        isItemUnique && correctWallet.push(obj);
        localStorage.setItem("wallet", JSON.stringify([...correctWallet]));
      } else localStorage.setItem("wallet", JSON.stringify([obj]));

      setIsPopupOpen(false);
      setErorr(false);
      setAmount("");
    } else setErorr(true);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!checkInputSymbol(e.target.value)) {
      return null;
    }

    setAmount(e.target.value);
    setErorr(e.target.value === "" ? true : false);
  }

  return (
    <Modal setIsPopupOpen={closePopup} isPopupOpen={isPopupOpen}>
      <div className="modal-header">
        <div className="modal__title">Add {cryptAbout?.name} to Wallet</div>
        <img
          src={cross}
          alt="cross"
          className="modal__cross"
          onClick={() => closePopup()}
        />
      </div>
      <div className="modal-body">
        <p className="modal__about">
          {cryptAbout?.name} price - {(+cryptAbout?.priceUsd).toFixed(5)}$
        </p>
        <form action="submit" onSubmit={(e) => e.preventDefault()}>
          <input
            className={`modal__input modal__input_crypt ${error ? "error" : ""}`}
            type="text"
            value={amount}
            onChange={(e) => onChange(e)}
            placeholder="Amount of Cryptocurrency"
          />
          <p className="rules">Min value - 0.00001. Max value - 999999</p>
          <div className="button-container">
            <Button
              type="submit"
              buttonType={ButtonTypes.button_action}
              size={ButtonSizes.size_lg}
              onClick={(e) => onSubmit(e)}
            >
              Add to Wallet
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
